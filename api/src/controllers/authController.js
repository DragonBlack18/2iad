import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import prisma from '../config/database.js';
import { AppError } from '../middlewares/errorHandler.js';

const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  role: z.enum(['SUPER_ADMIN', 'INCUBADO']).optional()
});

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória')
});

export const register = async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    
    // Verifica se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });
    
    if (existingUser) {
      throw new AppError('Email já cadastrado', 400);
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    // Cria usuário
    const user = await prisma.user.create({
      data: {
        email: data.email,
        senha: hashedPassword,
        nome: data.name,
        role: data.role || 'INCUBADO'
      },
      select: {
        id: true,
        email: true,
        nome: true,
        role: true,
        created_at: true
      }
    });
    
    // Log
    await prisma.log.create({
      data: {
        user_id: user.id,
        acao: 'CREATE',
        entidade: 'USER',
        entidade_id: user.id
      }
    });
    
    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    
    // Busca usuário
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });
    
    if (!user || !user.ativo) {
      throw new AppError('Credenciais inválidas', 401);
    }
    
    // Verifica senha
    const validPassword = await bcrypt.compare(data.password, user.senha);
    
    if (!validPassword) {
      throw new AppError('Credenciais inválidas', 401);
    }
    
    // Gera token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    
    // Log
    await prisma.log.create({
      data: {
        user_id: user.id,
        acao: 'LOGIN',
        entidade: 'USER',
        entidade_id: user.id
      }
    });
    
    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.nome,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        nome: true,
        role: true,
        created_at: true,
        startup_membros: {
          include: {
            startup: true
          }
        }
      }
    });
    
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updateSchema = z.object({
      nome: z.string().min(3).optional(),
      currentPassword: z.string().optional(),
      newPassword: z.string().min(6).optional()
    });
    
    const data = updateSchema.parse(req.body);
    const updateData = {};
    
    if (data.nome) {
      updateData.nome = data.nome;
    }
    
    if (data.newPassword && data.currentPassword) {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id }
      });
      
      const validPassword = await bcrypt.compare(data.currentPassword, user.senha);
      
      if (!validPassword) {
        throw new AppError('Senha atual incorreta', 400);
      }
      
      updateData.senha = await bcrypt.hash(data.newPassword, 10);
    }
    
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        updatedAt: true
      }
    });
    
    res.json({
      message: 'Perfil atualizado com sucesso',
      user
    });
  } catch (error) {
    next(error);
  }
};
