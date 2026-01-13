export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  // Prisma errors
  if (err.code === 'P2002') {
    return res.status(400).json({
      error: 'Registro duplicado',
      field: err.meta?.target
    });
  }
  
  if (err.code === 'P2025') {
    return res.status(404).json({
      error: 'Registro não encontrado'
    });
  }
  
  // Zod validation errors
  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: 'Erro de validação',
      details: err.errors
    });
  }
  
  // Multer errors
  if (err.name === 'MulterError') {
    return res.status(400).json({
      error: 'Erro no upload de arquivo',
      details: err.message
    });
  }
  
  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';
  
  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}
