import { z } from 'zod';
import prisma from '../config/database.js';
import { AppError } from '../middlewares/errorHandler.js';

const planilhaSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().optional().nullable()
});

// GET /api/planilhas
export const getAllPlanilhas = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    
    let planilhas;
    
    if (userRole === 'SUPER_ADMIN') {
      // Admin vê todas
      planilhas = await prisma.planilha.findMany({
        include: {
          permissions: {
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
          _count: {
            select: { rows: true }
          }
        },
        orderBy: { updatedAt: 'desc' }
      });
    } else {
      // Incubado vê apenas as que tem permissão
      planilhas = await prisma.planilha.findMany({
        where: {
          permissions: {
            some: {
              userId,
              canView: true
            }
          }
        },
        include: {
          permissions: {
            where: { userId }
          },
          _count: {
            select: { rows: true }
          }
        },
        orderBy: { updatedAt: 'desc' }
      });
    }
    
    res.json({ planilhas });
  } catch (error) {
    next(error);
  }
};

// GET /api/planilhas/:id
export const getPlanilhaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;
    
    const planilha = await prisma.planilha.findUnique({
      where: { id },
      include: {
        rows: {
          orderBy: { rowIndex: 'asc' }
        },
        permissions: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });
    
    if (!planilha) {
      throw new AppError('Planilha não encontrada', 404);
    }
    
    // Verifica permissão
    if (userRole !== 'SUPER_ADMIN') {
      const permission = planilha.permissions.find(p => p.userId === userId);
      if (!permission || !permission.canView) {
        throw new AppError('Sem permissão para acessar esta planilha', 403);
      }
    }
    
    res.json({ planilha });
  } catch (error) {
    next(error);
  }
};

// POST /api/planilhas (admin only)
export const createPlanilha = async (req, res, next) => {
  try {
    const data = planilhaSchema.parse(req.body);
    
    const planilha = await prisma.planilha.create({
      data
    });
    
    // Log
    await prisma.log.create({
      data: {
        userId: req.user.id,
        action: 'CREATE',
        entity: 'PLANILHA',
        entityId: planilha.id,
        details: { name: planilha.name }
      }
    });
    
    res.status(201).json({
      message: 'Planilha criada com sucesso',
      planilha
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/planilhas/:id (admin only)
export const updatePlanilha = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = planilhaSchema.partial().parse(req.body);
    
    const planilha = await prisma.planilha.update({
      where: { id },
      data
    });
    
    // Log
    await prisma.log.create({
      data: {
        userId: req.user.id,
        action: 'UPDATE',
        entity: 'PLANILHA',
        entityId: planilha.id,
        details: { name: planilha.name }
      }
    });
    
    res.json({
      message: 'Planilha atualizada com sucesso',
      planilha
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/planilhas/:id (admin only)
export const deletePlanilha = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await prisma.planilha.delete({
      where: { id }
    });
    
    // Log
    await prisma.log.create({
      data: {
        userId: req.user.id,
        action: 'DELETE',
        entity: 'PLANILHA',
        entityId: id
      }
    });
    
    res.json({ message: 'Planilha deletada com sucesso' });
  } catch (error) {
    next(error);
  }
};

// POST /api/planilhas/:id/rows
export const addRow = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data: rowData } = req.body;
    
    // Verifica permissão de edição
    if (req.user.role !== 'SUPER_ADMIN') {
      const permission = await prisma.planilhaPermission.findUnique({
        where: {
          planilhaId_userId: {
            planilhaId: id,
            userId: req.user.id
          }
        }
      });
      
      if (!permission || !permission.canEdit) {
        throw new AppError('Sem permissão para editar esta planilha', 403);
      }
    }
    
    // Pega o próximo índice
    const lastRow = await prisma.planilhaRow.findFirst({
      where: { planilhaId: id },
      orderBy: { rowIndex: 'desc' }
    });
    
    const rowIndex = lastRow ? lastRow.rowIndex + 1 : 0;
    
    const row = await prisma.planilhaRow.create({
      data: {
        planilhaId: id,
        rowIndex,
        data: rowData || {}
      }
    });
    
    res.status(201).json({
      message: 'Linha adicionada com sucesso',
      row
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/planilhas/:planilhaId/rows/:rowId
export const updateRow = async (req, res, next) => {
  try {
    const { rowId } = req.params;
    const { data: rowData } = req.body;
    
    const row = await prisma.planilhaRow.findUnique({
      where: { id: rowId },
      include: { planilha: true }
    });
    
    if (!row) {
      throw new AppError('Linha não encontrada', 404);
    }
    
    // Verifica permissão de edição
    if (req.user.role !== 'SUPER_ADMIN') {
      const permission = await prisma.planilhaPermission.findUnique({
        where: {
          planilhaId_userId: {
            planilhaId: row.planilhaId,
            userId: req.user.id
          }
        }
      });
      
      if (!permission || !permission.canEdit) {
        throw new AppError('Sem permissão para editar esta planilha', 403);
      }
    }
    
    const updatedRow = await prisma.planilhaRow.update({
      where: { id: rowId },
      data: { data: rowData }
    });
    
    res.json({
      message: 'Linha atualizada com sucesso',
      row: updatedRow
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/planilhas/:planilhaId/rows/:rowId
export const deleteRow = async (req, res, next) => {
  try {
    const { rowId } = req.params;
    
    const row = await prisma.planilhaRow.findUnique({
      where: { id: rowId }
    });
    
    if (!row) {
      throw new AppError('Linha não encontrada', 404);
    }
    
    // Verifica permissão
    if (req.user.role !== 'SUPER_ADMIN') {
      const permission = await prisma.planilhaPermission.findUnique({
        where: {
          planilhaId_userId: {
            planilhaId: row.planilhaId,
            userId: req.user.id
          }
        }
      });
      
      if (!permission || !permission.canEdit) {
        throw new AppError('Sem permissão para editar esta planilha', 403);
      }
    }
    
    await prisma.planilhaRow.delete({
      where: { id: rowId }
    });
    
    res.json({ message: 'Linha deletada com sucesso' });
  } catch (error) {
    next(error);
  }
};

// POST /api/planilhas/:id/permissions (admin only)
export const addPermission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, canEdit, canView } = req.body;
    
    if (!userId) {
      throw new AppError('userId é obrigatório', 400);
    }
    
    const permission = await prisma.planilhaPermission.upsert({
      where: {
        planilhaId_userId: {
          planilhaId: id,
          userId
        }
      },
      update: {
        canEdit: canEdit !== undefined ? canEdit : false,
        canView: canView !== undefined ? canView : true
      },
      create: {
        planilhaId: id,
        userId,
        canEdit: canEdit !== undefined ? canEdit : false,
        canView: canView !== undefined ? canView : true
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
      message: 'Permissão atualizada com sucesso',
      permission
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/planilhas/:planilhaId/permissions/:permissionId (admin only)
export const removePermission = async (req, res, next) => {
  try {
    const { permissionId } = req.params;
    
    await prisma.planilhaPermission.delete({
      where: { id: permissionId }
    });
    
    res.json({ message: 'Permissão removida com sucesso' });
  } catch (error) {
    next(error);
  }
};
