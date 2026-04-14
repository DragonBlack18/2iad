import prisma from '../config/database.js';

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// GET /api/editais
export const getAllEditais = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (status) {
      where.status = status;
    }

    const [editais, total] = await Promise.all([
      prisma.edital.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { data_abertura: 'desc' }
      }),
      prisma.edital.count({ where })
    ]);

    res.json({
      editais,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/editais/:slug
export const getEditalBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const edital = await prisma.edital.findUnique({
      where: { slug }
    });

    if (!edital) {
      return res.status(404).json({ error: 'Edital não encontrado' });
    }

    res.json(edital);
  } catch (error) {
    next(error);
  }
};

// POST /api/editais
export const createEdital = async (req, res, next) => {
  try {
    const {
      titulo,
      slug,
      descricao,
      conteudo,
      imagem,
      arquivo_pdf,
      status,
      data_abertura,
      data_encerramento,
      data_resultado,
      valor_investimento,
      requisitos,
      beneficios,
      documentos_necessarios
    } = req.body;

    if (!titulo || !descricao) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: titulo, descricao' 
      });
    }

    const editalSlug = slug || generateSlug(titulo);

    const existingEdital = await prisma.edital.findUnique({
      where: { slug: editalSlug }
    });

    if (existingEdital) {
      return res.status(400).json({ error: 'Slug já existe' });
    }

    const edital = await prisma.edital.create({
      data: {
        titulo,
        slug: editalSlug,
        descricao,
        conteudo,
        imagem,
        arquivo_pdf,
        status: status || 'RASCUNHO',
        data_abertura: data_abertura ? new Date(data_abertura) : null,
        data_encerramento: data_encerramento ? new Date(data_encerramento) : null,
        data_resultado: data_resultado ? new Date(data_resultado) : null,
        valor_investimento,
        requisitos,
        beneficios,
        documentos_necessarios
      }
    });

    res.status(201).json(edital);
  } catch (error) {
    next(error);
  }
};

// PUT /api/editais/:id
export const updateEdital = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    delete updateData.id;
    delete updateData.created_at;

    if (updateData.data_abertura) {
      updateData.data_abertura = new Date(updateData.data_abertura);
    }
    if (updateData.data_encerramento) {
      updateData.data_encerramento = new Date(updateData.data_encerramento);
    }
    if (updateData.data_resultado) {
      updateData.data_resultado = new Date(updateData.data_resultado);
    }

    const edital = await prisma.edital.update({
      where: { id },
      data: updateData
    });

    res.json(edital);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Edital não encontrado' });
    }
    next(error);
  }
};

// DELETE /api/editais/:id
export const deleteEdital = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.edital.delete({
      where: { id }
    });

    res.json({ message: 'Edital removido com sucesso' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Edital não encontrado' });
    }
    next(error);
  }
};

// GET /api/editais/:id/candidaturas
export const getEditalCandidaturas = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.query;

    const where = { edital_id: id };
    if (status) {
      where.status = status;
    }

    const candidaturas = await prisma.candidaturas.findMany({
      where,
      include: {
        users_candidaturas_user_idTousers: {
          select: {
            id: true,
            nome: true,
            email: true,
            telefone: true
          }
        },
        startups: {
          select: {
            id: true,
            nome: true,
            slug: true,
            setor: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    res.json(candidaturas);
  } catch (error) {
    next(error);
  }
};
