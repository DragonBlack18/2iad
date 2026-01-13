import express from 'express';
import authRoutes from './auth.js';
import startupsRoutes from './startups.js';
import editaisRoutes from './editais.js';
import parceirosRoutes from './parceiros.js';
import planilhasRoutes from './planilhas.js';
import mediaRoutes from './media.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/startups', startupsRoutes);
router.use('/editais', editaisRoutes);
router.use('/parceiros', parceirosRoutes);
router.use('/planilhas', planilhasRoutes);
router.use('/media', mediaRoutes);

export default router;
