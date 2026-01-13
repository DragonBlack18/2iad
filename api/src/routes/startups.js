import express from 'express';
import {
  getAllStartups,
  getStartupBySlug,
  createStartup,
  updateStartup,
  deleteStartup,
  addStartupMember,
  removeStartupMember
} from '../controllers/startupsController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Rotas públicas
router.get('/', getAllStartups);
router.get('/:slug', getStartupBySlug);

// Rotas protegidas (admin only)
router.post('/', authenticate, authorize('SUPER_ADMIN'), createStartup);
router.put('/:id', authenticate, authorize('SUPER_ADMIN'), updateStartup);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), deleteStartup);

// Membros
router.post('/:id/members', authenticate, authorize('SUPER_ADMIN'), addStartupMember);
router.delete('/:startupId/members/:memberId', authenticate, authorize('SUPER_ADMIN'), removeStartupMember);

export default router;
