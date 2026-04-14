import express from 'express';
import {
  getAllParceiros,
  getParceiroBySlug,
  createParceiro,
  updateParceiro,
  deleteParceiro
} from '../controllers/parceirosController.js';
import { authenticate, isSuperAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Rotas públicas
router.get('/', getAllParceiros);
router.get('/:slug', getParceiroBySlug);

// Rotas protegidas (admin only)
router.post('/', authenticate, isSuperAdmin, createParceiro);
router.put('/:id', authenticate, isSuperAdmin, updateParceiro);
router.delete('/:id', authenticate, isSuperAdmin, deleteParceiro);

export default router;
