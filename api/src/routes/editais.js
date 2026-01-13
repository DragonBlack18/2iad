import express from 'express';
import {
  getAllEditais,
  getEditalBySlug,
  createEdital,
  updateEdital,
  deleteEdital
} from '../controllers/editaisController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Rotas públicas
router.get('/', getAllEditais);
router.get('/:slug', getEditalBySlug);

// Rotas protegidas (admin only)
router.post('/', authenticate, authorize('SUPER_ADMIN'), createEdital);
router.put('/:id', authenticate, authorize('SUPER_ADMIN'), updateEdital);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), deleteEdital);

export default router;
