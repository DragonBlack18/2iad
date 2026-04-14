import prisma from '../config/database.js';

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// GET /api/parceiros
export const getAllParceiros = async (req, res, next) => {
  try {
    const { tipo, ativo } = req.query;

    const where = {};
    if (tipo) where.tipo = tipo;
    if (ativo !== undefined) where.ativo = ativo === 'true';

    const parceiros = await prisma.parceiro.findMany({
      where,
      orderBy: { nome: 'asc' }
    });
    
    res.json({ parceiros });
  } catch (error) {
    next(error);
  }
};

// GET /api/parceiros/:slug
export const getParceiroBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const parceiro = await prisma.parceiro.findUnique({
      where: { slug }
    });
    
    if (!parceiro) {
      return res.status(404).json({ error: 'Parceiro não encontrado' });
    }
    
    res.json(parceiro);
  } catch (error) {
    next(error);
  }
};

// POST /api/parceiros
export const createParceiro = async (req, res, next) => {
  try {
    const {
      nome,
      slug,
      descricao,
      logo,
      website,
      email,
      telefone,
      tipo,
      redes_sociais,
      ativo
    } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'Campo nome é obrigatório' });
    }

    const parceiroSlug = slug || generateSlug(nome);

    const existingParceiro = await prisma.parceiro.findUnique({
      where: { slug: parceiroSlug }
    });

    if (existingParceiro) {
      return res.status(400).json({ error: 'Slug já existe' });
    }

    const parceiro = await prisma.parceiro.create({
      data: {
        nome,
        slug: parceiroSlug,
        descricao,
        logo,
        website,
        email,
        telefone,
        tipo: tipo || 'EMPRESA',
        redes_sociais,
        ativo: ativo !== undefined ? ativo : true
      }
    });

    res.status(201).json(parceiro);
  } catch (error) {
    next(error);
  }
};

// PUT /api/parceiros/:id
export const updateParceiro = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    delete updateData.id;
    delete updateData.created_at;

    const parceiro = await prisma.parceiro.update({
      where: { id },
      data: updateData
    });

    res.json(parceiro);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Parceiro não encontrado' });
    }
    next(error);
  }
};

// DELETE /api/parceiros/:id
export const deleteParceiro = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.parceiro.delete({
      where: { id }
    });

    res.json({ message: 'Parceiro removido com sucesso' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Parceiro não encontrado' });
    }
    next(error);
  }
};
