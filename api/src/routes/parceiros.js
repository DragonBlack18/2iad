import express from 'express';
import {
  getAllParceiros,
  getParceiroBySlug,
  createParceiro,
  updateParceiro,
  deleteParceiro
} from '../controllers/parceirosController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Rotas públicas
router.get('/', getAllParceiros);
router.get('/:slug', getParceiroBySlug);

// Rotas protegidas (admin only)
router.post('/', authenticate, authorize('SUPER_ADMIN'), createParceiro);
router.put('/:id', authenticate, authorize('SUPER_ADMIN'), updateParceiro);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), deleteParceiro);

export default router;
