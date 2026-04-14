import express from 'express';
import {
  getAllPlanilhas,
  getPlanilhaById,
  createPlanilha,
  updatePlanilha,
  deletePlanilha,
  addColuna,
  addLinha,
  updateCelula,
  addPermissao
} from '../controllers/planilhasController.js';
import { authenticate, canAccessPlanilha } from '../middlewares/auth.js';

const router = express.Router();

// Rotas protegidas (usuário autenticado)
router.get('/', authenticate, getAllPlanilhas);
router.post('/', authenticate, createPlanilha);

// Rotas de planilha específica (com verificação de acesso multi-tenant)
router.get('/:id', authenticate, canAccessPlanilha, getPlanilhaById);
router.put('/:id', authenticate, canAccessPlanilha, updatePlanilha);
router.delete('/:id', authenticate, canAccessPlanilha, deletePlanilha);

// Rotas de manipulação de dados
router.post('/:id/colunas', authenticate, canAccessPlanilha, addColuna);
router.post('/:id/linhas', authenticate, canAccessPlanilha, addLinha);
router.put('/:id/celulas/:celulaId', authenticate, canAccessPlanilha, updateCelula);

// Rotas de permissões
router.post('/:id/permissoes', authenticate, canAccessPlanilha, addPermissao);

export default router;
