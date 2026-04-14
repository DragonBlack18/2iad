import express from 'express';
import {
  getAllEditais,
  getEditalBySlug,
  createEdital,
  updateEdital,
  deleteEdital,
  getEditalCandidaturas
} from '../controllers/editaisController.js';
import { authenticate, isSuperAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Rotas públicas
router.get('/', getAllEditais);
router.get('/:slug', getEditalBySlug);

// Rotas protegidas (admin only)
router.post('/', authenticate, isSuperAdmin, createEdital);
router.put('/:id', authenticate, isSuperAdmin, updateEdital);
router.delete('/:id', authenticate, isSuperAdmin, deleteEdital);
router.get('/:id/candidaturas', authenticate, isSuperAdmin, getEditalCandidaturas);

export default router;
