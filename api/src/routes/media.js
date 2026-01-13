import express from 'express';
import { upload } from '../middlewares/upload.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import prisma from '../config/database.js';

const router = express.Router();

// Upload de arquivo (admin only)
router.post('/upload', authenticate, authorize('SUPER_ADMIN'), upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }
    
    const { startupId } = req.body;
    
    // Determina o tipo de arquivo
    let type = 'DOCUMENT';
    if (req.file.mimetype.startsWith('image/')) type = 'IMAGE';
    else if (req.file.mimetype === 'application/pdf') type = 'PDF';
    else if (req.file.mimetype.startsWith('video/')) type = 'VIDEO';
    
    const media = await prisma.media.create({
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        path: `/uploads/${req.file.filename}`,
        type,
        size: req.file.size,
        mimeType: req.file.mimetype,
        startupId: startupId || null
      }
    });
    
    // Log
    await prisma.log.create({
      data: {
        userId: req.user.id,
        action: 'UPLOAD',
        entity: 'MEDIA',
        entityId: media.id,
        details: { filename: media.originalName }
      }
    });
    
    res.status(201).json({
      message: 'Arquivo enviado com sucesso',
      media
    });
  } catch (error) {
    next(error);
  }
});

// Listar arquivos
router.get('/', authenticate, authorize('SUPER_ADMIN'), async (req, res, next) => {
  try {
    const { startupId, type } = req.query;
    
    const where = {};
    if (startupId) where.startupId = startupId;
    if (type) where.type = type;
    
    const media = await prisma.media.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({ media });
  } catch (error) {
    next(error);
  }
});

// Deletar arquivo
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await prisma.media.delete({
      where: { id }
    });
    
    res.json({ message: 'Arquivo deletado com sucesso' });
  } catch (error) {
    next(error);
  }
});

export default router;
