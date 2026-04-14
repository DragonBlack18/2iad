import prisma from '../config/database.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do Multer
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error, null);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx|ppt|pptx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Apenas imagens, PDFs e documentos são permitidos'));
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter
});

// POST /api/media - Upload de arquivo
export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const { relacionado_tipo, relacionado_id } = req.body;

    const media = await prisma.media.create({
      data: {
        tipo: req.file.mimetype.split('/')[0].toUpperCase(), // IMAGE, APPLICATION, etc
        url: `/uploads/${req.file.filename}`,
        nome_arquivo: req.file.originalname,
        tamanho: req.file.size,
        mime_type: req.file.mimetype,
        relacionado_tipo,
        relacionado_id,
        uploaded_by: req.user.id
      }
    });

    res.status(201).json(media);
  } catch (error) {
    next(error);
  }
};

// GET /api/media - Lista arquivos
export const getAllMedia = async (req, res, next) => {
  try {
    const { tipo, relacionado_tipo, relacionado_id } = req.query;

    const where = {};
    if (tipo) where.tipo = tipo;
    if (relacionado_tipo) where.relacionado_tipo = relacionado_tipo;
    if (relacionado_id) where.relacionado_id = relacionado_id;

    // INCUBADO vê só arquivos relacionados à sua startup
    if (req.user.role === 'INCUBADO') {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: { startup_id: true }
      });

      if (user.startup_id) {
        where.OR = [
          { uploaded_by: req.user.id },
          { relacionado_tipo: 'STARTUP', relacionado_id: user.startup_id }
        ];
      } else {
        where.uploaded_by = req.user.id;
      }
    }

    const media = await prisma.media.findMany({
      where,
      include: {
        uploader: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    res.json({ media });
  } catch (error) {
    next(error);
  }
};

// GET /api/media/:id - Busca arquivo por ID
export const getMediaById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const media = await prisma.media.findUnique({
      where: { id },
      include: {
        uploader: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        }
      }
    });

    if (!media) {
      return res.status(404).json({ error: 'Arquivo não encontrado' });
    }

    res.json(media);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/media/:id - Remove arquivo
export const deleteMedia = async (req, res, next) => {
  try {
    const { id } = req.params;

    const media = await prisma.media.findUnique({
      where: { id }
    });

    if (!media) {
      return res.status(404).json({ error: 'Arquivo não encontrado' });
    }

    // Verifica permissão (apenas quem fez upload ou SUPER_ADMIN)
    if (media.uploaded_by !== req.user.id && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ error: 'Sem permissão para deletar este arquivo' });
    }

    // Remove arquivo físico
    const filePath = path.join(__dirname, '../../', media.url);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error('Erro ao deletar arquivo físico:', error);
    }

    // Remove do banco
    await prisma.media.delete({
      where: { id }
    });

    res.json({ message: 'Arquivo removido com sucesso' });
  } catch (error) {
    next(error);
  }
};
