import { z } from 'zod';
import prisma from '../config/database.js';
import { AppError } from '../middlewares/errorHandler.js';

const editalSchema = z.object({
  title: z.string().min(5, 'Título deve ter no mínimo 5 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  pdfUrl: z.string().url().optional().nullable(),
  status: z.enum(['ABERTO', 'FECHADO', 'EM_ANALISE']).optional(),
  startDate: z.string(),
  endDate: z.string()
});

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// GET /api/editais (público)
export const getAllEditais = async (req, res, next) => {
  try {
    const { status } = req.query;
    
    const where = {};
    if (status) where.status = status;
    
    const editais = await prisma.edital.findMany({
      where,
      orderBy: { startDate: 'desc' }
    });
    
    res.json({ editais });
  } catch (error) {
    next(error);
  }
};

// GET /api/editais/:slug (público)
export const getEditalBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const edital = await prisma.edital.findUnique({
      where: { slug }
    });
    
    if (!edital) {
      throw new AppError('Edital não encontrado', 404);
    }
    
    res.json({ edital });
  } catch (error) {
    next(error);
  }
};

// POST /api/editais (admin only)
export const createEdital = async (req, res, next) => {
  try {
    const data = editalSchema.parse(req.body);
    
    const slug = generateSlug(data.title);
    
    const edital = await prisma.edital.create({
      data: {
        ...data,
        slug,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate)
      }
    });
    
    // Log
    await prisma.log.create({
      data: {
        userId: req.user.id,
        action: 'CREATE',
        entity: 'EDITAL',
        entityId: edital.id,
        details: { title: edital.title }
      }
    });
    
    res.status(201).json({
      message: 'Edital criado com sucesso',
      edital
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/editais/:id (admin only)
export const updateEdital = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = editalSchema.partial().parse(req.body);
    
    if (data.title) {
      data.slug = generateSlug(data.title);
    }
    
    if (data.startDate) {
      data.startDate = new Date(data.startDate);
    }
    
    if (data.endDate) {
      data.endDate = new Date(data.endDate);
    }
    
    const edital = await prisma.edital.update({
      where: { id },
      data
    });
    
    // Log
    await prisma.log.create({
      data: {
        userId: req.user.id,
        action: 'UPDATE',
        entity: 'EDITAL',
        entityId: edital.id,
        details: { title: edital.title }
      }
    });
    
    res.json({
      message: 'Edital atualizado com sucesso',
      edital
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/editais/:id (admin only)
export const deleteEdital = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await prisma.edital.delete({
      where: { id }
    });
    
    // Log
    await prisma.log.create({
      data: {
        userId: req.user.id,
        action: 'DELETE',
        entity: 'EDITAL',
        entityId: id
      }
    });
    
    res.json({ message: 'Edital deletado com sucesso' });
  } catch (error) {
    next(error);
  }
};
