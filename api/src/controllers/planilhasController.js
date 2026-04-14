import prisma from '../config/database.js';

// GET /api/planilhas - Lista planilhas (filtradas por startup do usuário)
export const getAllPlanilhas = async (req, res, next) => {
  try {
    const { tipo, ativa } = req.query;
    const where = {};

    // INCUBADO vê só suas planilhas
    if (req.user.role === 'INCUBADO') {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: { startup_id: true }
      });

      if (!user.startup_id) {
        return res.json({ planilhas: [] });
      }

      where.startup_id = user.startup_id;
    }

    if (tipo) where.tipo = tipo;
    if (ativa !== undefined) where.ativa = ativa === 'true';

    const planilhas = await prisma.planilha.findMany({
      where,
      include: {
        startup: {
          select: {
            id: true,
            nome: true,
            slug: true
          }
        },
        criador: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        },
        _count: {
          select: {
            colunas: true,
            linhas: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    res.json({ planilhas });
  } catch (error) {
    next(error);
  }
};

// GET /api/planilhas/:id - Busca planilha completa com dados
export const getPlanilhaById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const planilha = await prisma.planilha.findUnique({
      where: { id },
      include: {
        colunas: {
          orderBy: { ordem: 'asc' }
        },
        linhas: {
          include: {
            celulas: {
              include: {
                coluna: {
                  select: {
                    id: true,
                    nome: true,
                    tipo: true
                  }
                }
              }
            }
          },
          orderBy: { ordem: 'asc' }
        },
        startup: {
          select: {
            id: true,
            nome: true,
            slug: true
          }
        },
        permissoes: {
          include: {
            user: {
              select: {
                id: true,
                nome: true,
                email: true
              }
            }
          }
        }
      }
    });

    if (!planilha) {
      return res.status(404).json({ error: 'Planilha não encontrada' });
    }

    res.json(planilha);
  } catch (error) {
    next(error);
  }
};

// POST /api/planilhas - Cria nova planilha
export const createPlanilha = async (req, res, next) => {
  try {
    const { nome, descricao, startup_id, tipo, template, config, colunas } = req.body;

    if (!nome || !startup_id) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: nome, startup_id' 
      });
    }

    // INCUBADO só pode criar para sua própria startup
    if (req.user.role === 'INCUBADO') {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: { startup_id: true }
      });

      if (user.startup_id !== startup_id) {
        return res.status(403).json({ 
          error: 'Você só pode criar planilhas para sua startup' 
        });
      }
    }

    const planilha = await prisma.$transaction(async (tx) => {
      const newPlanilha = await tx.planilha.create({
        data: {
          nome,
          descricao,
          startup_id,
          tipo: tipo || 'GERAL',
          template: template || false,
          config,
          criado_por: req.user.id,
          ativa: true,
          versao: 1
        }
      });

      const colunasData = colunas || [
        { nome: 'Coluna A', tipo: 'TEXT', ordem: 1 },
        { nome: 'Coluna B', tipo: 'TEXT', ordem: 2 },
        { nome: 'Coluna C', tipo: 'NUMBER', ordem: 3 }
      ];

      await tx.planilhaColuna.createMany({
        data: colunasData.map(col => ({
          planilha_id: newPlanilha.id,
          nome: col.nome,
          tipo: col.tipo || 'TEXT',
          ordem: col.ordem,
          largura: col.largura || 150,
          editavel: col.editavel !== undefined ? col.editavel : true,
          formula: col.formula
        }))
      });

      await tx.planilhaPermissao.create({
        data: {
          planilha_id: newPlanilha.id,
          user_id: req.user.id,
          permissao: 'OWNER'
        }
      });

      return newPlanilha;
    });

    res.status(201).json(planilha);
  } catch (error) {
    next(error);
  }
};

// POST /api/planilhas/:id/colunas - Adiciona coluna
export const addColuna = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nome, tipo, largura, editavel, formula } = req.body;

    if (req.userPermission === 'READ') {
      return res.status(403).json({ 
        error: 'Você não tem permissão para editar esta planilha' 
      });
    }

    const ultimaColuna = await prisma.planilhaColuna.findFirst({
      where: { planilha_id: id },
      orderBy: { ordem: 'desc' },
      select: { ordem: true }
    });

    const novaOrdem = (ultimaColuna?.ordem || 0) + 1;

    const coluna = await prisma.planilhaColuna.create({
      data: {
        planilha_id: id,
        nome: nome || `Coluna ${novaOrdem}`,
        tipo: tipo || 'TEXT',
        ordem: novaOrdem,
        largura: largura || 150,
        editavel: editavel !== undefined ? editavel : true,
        formula
      }
    });

    res.status(201).json(coluna);
  } catch (error) {
    next(error);
  }
};

// POST /api/planilhas/:id/linhas - Adiciona linha
export const addLinha = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.userPermission === 'READ') {
      return res.status(403).json({ 
        error: 'Você não tem permissão para editar esta planilha' 
      });
    }

    const ultimaLinha = await prisma.planilhaLinha.findFirst({
      where: { planilha_id: id },
      orderBy: { ordem: 'desc' },
      select: { ordem: true }
    });

    const novaOrdem = (ultimaLinha?.ordem || 0) + 1;

    const colunas = await prisma.planilhaColuna.findMany({
      where: { planilha_id: id },
      select: { id: true }
    });

    const linha = await prisma.$transaction(async (tx) => {
      const novaLinha = await tx.planilhaLinha.create({
        data: {
          planilha_id: id,
          ordem: novaOrdem
        }
      });

      if (colunas.length > 0) {
        await tx.planilhaCelula.createMany({
          data: colunas.map(col => ({
            linha_id: novaLinha.id,
            coluna_id: col.id,
            valor: null
          }))
        });
      }

      return novaLinha;
    });

    res.status(201).json(linha);
  } catch (error) {
    next(error);
  }
};

// PUT /api/planilhas/:id/celulas/:celulaId - Atualiza célula
export const updateCelula = async (req, res, next) => {
  try {
    const { id, celulaId } = req.params;
    const { valor, valor_numerico, valor_data, valor_boolean } = req.body;

    if (req.userPermission === 'READ') {
      return res.status(403).json({ 
        error: 'Você não tem permissão para editar esta planilha' 
      });
    }

    const celula = await prisma.planilhaCelula.update({
      where: { id: celulaId },
      data: {
        valor,
        valor_numerico: valor_numerico ? parseFloat(valor_numerico) : null,
        valor_data: valor_data ? new Date(valor_data) : null,
        valor_boolean,
        updated_by: req.user.id
      }
    });

    res.json(celula);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Célula não encontrada' });
    }
    next(error);
  }
};

// PUT /api/planilhas/:id - Atualiza planilha
export const updatePlanilha = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.userPermission !== 'OWNER' && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ 
        error: 'Apenas o dono pode atualizar configurações da planilha' 
      });
    }

    delete updateData.id;
    delete updateData.created_at;
    delete updateData.criado_por;
    delete updateData.startup_id;

    updateData.atualizado_por = req.user.id;

    const planilha = await prisma.planilha.update({
      where: { id },
      data: updateData
    });

    res.json(planilha);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Planilha não encontrada' });
    }
    next(error);
  }
};

// DELETE /api/planilhas/:id - Remove planilha
export const deletePlanilha = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.userPermission !== 'OWNER' && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ 
        error: 'Apenas o dono pode deletar a planilha' 
      });
    }

    await prisma.planilha.delete({
      where: { id }
    });

    res.json({ message: 'Planilha removida com sucesso' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Planilha não encontrada' });
    }
    next(error);
  }
};

// POST /api/planilhas/:id/permissoes - Adiciona permissão de usuário
export const addPermissao = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id, permissao } = req.body;

    if (req.userPermission !== 'OWNER' && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ 
        error: 'Apenas o dono pode gerenciar permissões' 
      });
    }

    const permissaoRecord = await prisma.planilhaPermissao.create({
      data: {
        planilha_id: id,
        user_id,
        permissao: permissao || 'READ'
      },
      include: {
        user: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        }
      }
    });

    res.status(201).json(permissaoRecord);
  } catch (error) {
    next(error);
  }
};
