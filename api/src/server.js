import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Muitas requisições deste IP, tente novamente mais tarde.'
});

// Middlewares
app.use(cors({
  origin: [
    process.env.PUBLIC_URL || 'http://localhost:5173',
    process.env.ADMIN_URL || 'http://localhost:5174',
    'http://localhost:5174',
    'http://localhost:5173'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', limiter);

// Static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', routes);

// Root route - API Documentation
app.get('/', (req, res) => {
  res.json({
    name: '🚀 Incubadora 2IAD - API',
    version: '1.0.0',
    status: 'online',
    endpoints: {
      health: '/health',
      auth: '/api/auth/login',
      editais: '/api/editais',
      parceiros: '/api/parceiros',
      startups: '/api/startups',
      planilhas: '/api/planilhas (requer autenticação)',
      media: '/api/media (requer autenticação)'
    },
    documentation: {
      login: {
        method: 'POST',
        url: '/api/auth/login',
        body: {
          email: 'rose@incubadora2iad.com.br',
          password: '123456'
        }
      }
    },
    admin: 'http://localhost:5174',
    public: 'http://localhost:5173'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler (deve ser o último middleware)
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
});
