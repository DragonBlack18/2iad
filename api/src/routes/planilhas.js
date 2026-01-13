import express from 'express';
import {
  getAllPlanilhas,
  getPlanilhaById,
  createPlanilha,
  updatePlanilha,
  deletePlanilha,
  addRow,
  updateRow,
  deleteRow,
  addPermission,
  removePermission
} from '../controllers/planilhasController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Todas as rotas de planilhas requerem autenticação
router.use(authenticate);

// Listagem e detalhes
router.get('/', getAllPlanilhas);
router.get('/:id', getPlanilhaById);

// CRUD de planilhas (admin only)
router.post('/', authorize('SUPER_ADMIN'), createPlanilha);
router.put('/:id', authorize('SUPER_ADMIN'), updatePlanilha);
router.delete('/:id', authorize('SUPER_ADMIN'), deletePlanilha);

// Linhas (requer permissão)
router.post('/:id/rows', addRow);
router.put('/:planilhaId/rows/:rowId', updateRow);
router.delete('/:planilhaId/rows/:rowId', deleteRow);

// Permissões (admin only)
router.post('/:id/permissions', authorize('SUPER_ADMIN'), addPermission);
router.delete('/:planilhaId/permissions/:permissionId', authorize('SUPER_ADMIN'), removePermission);

export default router;
