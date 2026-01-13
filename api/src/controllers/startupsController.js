import { z } from 'zod';
import prisma from '../config/database.js';
import { AppError } from '../middlewares/errorHandler.js';

const startupSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  segment: z.string().min(3, 'Segmento é obrigatório'),
  status: z.enum(['ATIVA', 'GRADUADA', 'INATIVA']).optional(),
  logoUrl: z.string().url().optional().nullable(),
  website: z.string().url().optional().nullable(),
  instagram: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  foundedAt: z.string().optional().nullable()
});

// Função para gerar slug
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// GET /api/startups (público)
export const getAllStartups = async (req, res, next) => {
  try {
    const { status, segment, search } = req.query;
    
    const where = {};
    
    if (status) where.status = status;
    if (segment) where.segment = segment;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    const startups = await prisma.startup.findMany({
      where,
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        },
        media: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({ startups });
  } catch (error) {
    next(error);
  }
};

// GET /api/startups/:slug (público)
export const getStartupBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const startup = await prisma.startup.findUnique({
      where: { slug },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        },
        media: true
      }
    });
    
    if (!startup) {
      throw new AppError('Startup não encontrada', 404);
    }
    
    res.json({ startup });
  } catch (error) {
    next(error);
  }
};

// POST /api/startups (admin only)
export const createStartup = async (req, res, next) => {
  try {
    const data = startupSchema.parse(req.body);
    
    const slug = generateSlug(data.name);
    
    // Verifica se slug já existe
    const existingStartup = await prisma.startup.findUnique({
      where: { slug }
    });
    
    if (existingStartup) {
      throw new AppError('Já existe uma startup com esse nome', 400);
    }
    
    const startup = await prisma.startup.create({
      data: {
        ...data,
        slug,
        foundedAt: data.foundedAt ? new Date(data.foundedAt) : null
      }
    });
    
    // Log
    await prisma.log.create({
      data: {
        userId: req.user.id,
        action: 'CREATE',
        entity: 'STARTUP',
        entityId: startup.id,
        details: { name: startup.name }
      }
    });
    
    res.status(201).json({
      message: 'Startup criada com sucesso',
      startup
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/startups/:id (admin only)
export const updateStartup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = startupSchema.partial().parse(req.body);
    
    // Se mudar o nome, gera novo slug
    if (data.name) {
      data.slug = generateSlug(data.name);
    }
    
    if (data.foundedAt) {
      data.foundedAt = new Date(data.foundedAt);
    }
    
    const startup = await prisma.startup.update({
      where: { id },
      data
    });
    
    // Log
    await prisma.log.create({
      data: {
        userId: req.user.id,
        action: 'UPDATE',
        entity: 'STARTUP',
        entityId: startup.id,
        details: { name: startup.name }
      }
    });
    
    res.json({
      message: 'Startup atualizada com sucesso',
      startup
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/startups/:id (admin only)
export const deleteStartup = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await prisma.startup.delete({
      where: { id }
    });
    
    // Log
    await prisma.log.create({
      data: {
        userId: req.user.id,
        action: 'DELETE',
        entity: 'STARTUP',
        entityId: id
      }
    });
    
    res.json({ message: 'Startup deletada com sucesso' });
  } catch (error) {
    next(error);
  }
};

// POST /api/startups/:id/members (admin only)
export const addStartupMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.body;
    
    if (!userId || !role) {
      throw new AppError('userId e role são obrigatórios', 400);
    }
    
    const member = await prisma.startupMember.create({
      data: {
        userId,
        startupId: id,
        role
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    res.status(201).json({
      message: 'Membro adicionado com sucesso',
      member
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/startups/:startupId/members/:memberId (admin only)
export const removeStartupMember = async (req, res, next) => {
  try {
    const { memberId } = req.params;
    
    await prisma.startupMember.delete({
      where: { id: memberId }
    });
    
    res.json({ message: 'Membro removido com sucesso' });
  } catch (error) {
    next(error);
  }
};
