import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    const token = authHeader.substring(7);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        nome: true,
        role: true,
        ativo: true
      }
    });
    
    if (!user || !user.ativo) {
      return res.status(401).json({ error: 'Usuário não autorizado' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    next(error);
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Não autenticado' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Sem permissão para acessar este recurso' });
    }
    
    next();
  };
};

// Middleware para verificar se é SUPER_ADMIN
export const isSuperAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Não autenticado' });
  }
  
  if (req.user.role !== 'SUPER_ADMIN') {
    return res.status(403).json({ error: 'Acesso restrito a administradores' });
  }
  
  next();
};

// Middleware para verificar se usuário pertence à startup ou é SUPER_ADMIN
export const canAccessStartup = async (req, res, next) => {
  try {
    const { startupId } = req.params;
    
    // SUPER_ADMIN pode acessar tudo
    if (req.user.role === 'SUPER_ADMIN') {
      return next();
    }
    
    // Verifica se o usuário pertence à startup
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { startup_id: true }
    });
    
    if (user.startup_id !== startupId) {
      return res.status(403).json({ error: 'Você não tem acesso a esta startup' });
    }
    
    next();
  } catch (error) {
    next(error);
  }
};

// Middleware para verificar se usuário pode acessar planilha
export const canAccessPlanilha = async (req, res, next) => {
  try {
    const { id, planilhaId } = req.params;
    const planilhaIdToCheck = id || planilhaId;
    
    // SUPER_ADMIN pode acessar tudo
    if (req.user.role === 'SUPER_ADMIN') {
      return next();
    }
    
    // Busca a planilha e verifica se o usuário tem acesso
    const planilha = await prisma.planilha.findUnique({
      where: { id: planilhaIdToCheck },
      include: {
        startup: {
          select: { id: true }
        },
        permissoes: {
          where: { user_id: req.user.id }
        }
      }
    });
    
    if (!planilha) {
      return res.status(404).json({ error: 'Planilha não encontrada' });
    }
    
    // Verifica se usuário pertence à startup da planilha
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { startup_id: true }
    });
    
    if (user.startup_id !== planilha.startup.id) {
      return res.status(403).json({ error: 'Você não tem acesso a esta planilha' });
    }
    
    // Adiciona a planilha e permissões no request
    req.planilha = planilha;
    req.userPermission = planilha.permissoes[0]?.permissao || 'READ';
    
    next();
  } catch (error) {
    next(error);
  }
};
