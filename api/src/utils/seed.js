import bcrypt from 'bcrypt';
import prisma from '../config/database.js';

async function seed() {
  try {
    console.log('🌱 Iniciando seed do banco de dados...');
    
    // Cria usuários
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    const rose = await prisma.user.create({
      data: {
        nome: 'Rose Admin',
        email: 'rose@incubadora2iad.com.br',
        senha: hashedPassword,
        role: 'SUPER_ADMIN',
        tipo: 'ADMINISTRADOR',
        ativo: true
      }
    });
    
    const incubado1 = await prisma.user.create({
      data: {
        nome: 'João Silva',
        email: 'joao@startup.com',
        senha: hashedPassword,
        role: 'INCUBADO',
        tipo: 'EMPREENDEDOR',
        ativo: true
      }
    });
    
    console.log('✅ Usuários criados:', { rose: rose.nome, incubado1: incubado1.nome });
    console.log('✅ Seed concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro no seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed();
