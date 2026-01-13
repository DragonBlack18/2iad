import { z } from 'zod';
import prisma from '../config/database.js';
import { AppError } from '../middlewares/errorHandler.js';

const parceiroSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().optional().nullable(),
  logoUrl: z.string().url().optional().nullable(),
  website: z.string().url().optional().nullable()
});

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// GET /api/parceiros (público)
export const getAllParceiros = async (req, res, next) => {
  try {
    const parceiros = await prisma.parceiro.findMany({
      orderBy: { name: 'asc' }
    });
    
    res.json({ parceiros });
  } catch (error) {
    next(error);
  }
};

// GET /api/parceiros/:slug (público)
export const getParceiroBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const parceiro = await prisma.parceiro.findUnique({
      where: { slug }
    });
    
    if (!parceiro) {
      throw new AppError('Parceiro não encontrado', 404);
    }
    
    res.json({ parceiro });
  } catch (error) {
    next(error);
  }
};

// POST /api/parceiros (admin only)
export const createParceiro = async (req, res, next) => {
  try {
    const data = parceiroSchema.parse(req.body);
    
    const slug = generateSlug(data.name);
    
    const parceiro = await prisma.parceiro.create({
      data: {
        ...data,
        slug
      }
    });
    
    // Log
    await prisma.log.create({
      data: {
        userId: req.user.id,
        action: 'CREATE',
        entity: 'PARCEIRO',
        entityId: parceiro.id,
        details: { name: parceiro.name }
      }
    });
    
    res.status(201).json({
      message: 'Parceiro criado com sucesso',
      parceiro
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/parceiros/:id (admin only)
export const updateParceiro = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = parceiroSchema.partial().parse(req.body);
    
    if (data.name) {
      data.slug = generateSlug(data.name);
    }
    
    const parceiro = await prisma.parceiro.update({
      where: { id },
      data
    });
    
    // Log
    await prisma.log.create({
      data: {
        userId: req.user.id,
        action: 'UPDATE',
        entity: 'PARCEIRO',
        entityId: parceiro.id,
        details: { name: parceiro.name }
      }
    });
    
    res.json({
      message: 'Parceiro atualizado com sucesso',
      parceiro
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/parceiros/:id (admin only)
export const deleteParceiro = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await prisma.parceiro.delete({
      where: { id }
    });
    
    // Log
    await prisma.log.create({
      data: {
        userId: req.user.id,
        action: 'DELETE',
        entity: 'PARCEIRO',
        entityId: id
      }
    });
    
    res.json({ message: 'Parceiro deletado com sucesso' });
  } catch (error) {
    next(error);
  }
};
