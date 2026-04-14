import express from 'express';
import {
  uploadFile,
  getAllMedia,
  getMediaById,
  deleteMedia,
  upload
} from '../controllers/mediaController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// Rotas protegidas
router.post('/', authenticate, upload.single('file'), uploadFile);
router.get('/', authenticate, getAllMedia);
router.get('/:id', authenticate, getMediaById);
router.delete('/:id', authenticate, deleteMedia);

export default router;
