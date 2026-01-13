import bcrypt from 'bcrypt';
import prisma from '../config/database.js';

async function seed() {
  try {
    console.log('🌱 Iniciando seed do banco de dados...');
    
    // Limpa o banco
    await prisma.log.deleteMany();
    await prisma.planilhaPermission.deleteMany();
    await prisma.planilhaRow.deleteMany();
    await prisma.planilha.deleteMany();
    await prisma.media.deleteMany();
    await prisma.startupMember.deleteMany();
    await prisma.startup.deleteMany();
    await prisma.edital.deleteMany();
    await prisma.parceiro.deleteMany();
    await prisma.user.deleteMany();
    
    console.log('✅ Banco limpo');
    
    // Cria usuários
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    const rose = await prisma.user.create({
      data: {
        email: 'rose@incubadora2iad.com.br',
        password: hashedPassword,
        name: 'Rose Admin',
        role: 'SUPER_ADMIN'
      }
    });
    
    const incubado1 = await prisma.user.create({
      data: {
        email: 'joao@startup.com',
        password: hashedPassword,
        name: 'João Silva',
        role: 'INCUBADO'
      }
    });
    
    const incubado2 = await prisma.user.create({
      data: {
        email: 'maria@techcorp.com',
        password: hashedPassword,
        name: 'Maria Santos',
        role: 'INCUBADO'
      }
    });
    
    console.log('✅ Usuários criados');
    
    // Cria startups
    const startup1 = await prisma.startup.create({
      data: {
        name: 'TechVision AI',
        slug: 'techvision-ai',
        description: 'Soluções de inteligência artificial para análise preditiva de dados empresariais.',
        segment: 'Inteligência Artificial',
        status: 'ATIVA',
        website: 'https://techvision.ai',
        instagram: '@techvision_ai',
        linkedin: 'techvision-ai',
        foundedAt: new Date('2024-01-15')
      }
    });
    
    const startup2 = await prisma.startup.create({
      data: {
        name: 'EcoTech Solutions',
        slug: 'ecotech-solutions',
        description: 'Tecnologia sustentável para gestão de resíduos e economia circular.',
        segment: 'Sustentabilidade',
        status: 'ATIVA',
        website: 'https://ecotech.com.br',
        foundedAt: new Date('2023-08-20')
      }
    });
    
    const startup3 = await prisma.startup.create({
      data: {
        name: 'HealthConnect',
        slug: 'healthconnect',
        description: 'Plataforma de telemedicina e gestão de prontuários eletrônicos.',
        segment: 'Saúde',
        status: 'GRADUADA',
        website: 'https://healthconnect.com.br',
        foundedAt: new Date('2022-03-10')
      }
    });
    
    console.log('✅ Startups criadas');
    
    // Associa membros às startups
    await prisma.startupMember.create({
      data: {
        userId: incubado1.id,
        startupId: startup1.id,
        role: 'Founder'
      }
    });
    
    await prisma.startupMember.create({
      data: {
        userId: incubado2.id,
        startupId: startup2.id,
        role: 'Founder'
      }
    });
    
    console.log('✅ Membros associados');
    
    // Cria editais
    await prisma.edital.create({
      data: {
        title: 'Edital de Seleção 2026 - Primeira Chamada',
        slug: 'edital-selecao-2026-primeira-chamada',
        description: 'Edital para seleção de startups inovadoras nas áreas de tecnologia, saúde e sustentabilidade. Vagas limitadas.',
        status: 'ABERTO',
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-03-31'),
        pdfUrl: 'https://example.com/edital-2026.pdf'
      }
    });
    
    await prisma.edital.create({
      data: {
        title: 'Programa de Aceleração Tech 2026',
        slug: 'programa-aceleracao-tech-2026',
        description: 'Programa intensivo de 6 meses para startups de tecnologia em estágio inicial.',
        status: 'EM_ANALISE',
        startDate: new Date('2026-02-01'),
        endDate: new Date('2026-04-30')
      }
    });
    
    console.log('✅ Editais criados');
    
    // Cria parceiros
    await prisma.parceiro.create({
      data: {
        name: 'UNIT Universidade',
        slug: 'unit-universidade',
        description: 'Parceria acadêmica para desenvolvimento de pesquisas e capacitação.',
        logoUrl: 'https://example.com/logos/unit.png',
        website: 'https://unit.br'
      }
    });
    
    await prisma.parceiro.create({
      data: {
        name: 'SEBRAE',
        slug: 'sebrae',
        description: 'Apoio ao empreendedorismo e desenvolvimento de negócios.',
        logoUrl: 'https://example.com/logos/sebrae.png',
        website: 'https://sebrae.com.br'
      }
    });
    
    await prisma.parceiro.create({
      data: {
        name: 'Porto Digital',
        slug: 'porto-digital',
        description: 'Ambiente de inovação referência em tecnologia.',
        logoUrl: 'https://example.com/logos/porto-digital.png',
        website: 'https://portodigital.org'
      }
    });
    
    console.log('✅ Parceiros criados');
    
    // Cria planilha de exemplo
    const planilha1 = await prisma.planilha.create({
      data: {
        name: 'Acompanhamento Mensal - Janeiro 2026',
        description: 'Planilha de acompanhamento das startups incubadas.'
      }
    });
    
    // Adiciona linhas de exemplo
    await prisma.planilhaRow.createMany({
      data: [
        {
          planilhaId: planilha1.id,
          rowIndex: 0,
          data: {
            startup: 'TechVision AI',
            mes: 'Janeiro',
            faturamento: 15000,
            clientes: 5,
            status: 'Em desenvolvimento'
          }
        },
        {
          planilhaId: planilha1.id,
          rowIndex: 1,
          data: {
            startup: 'EcoTech Solutions',
            mes: 'Janeiro',
            faturamento: 8000,
            clientes: 3,
            status: 'MVP em testes'
          }
        }
      ]
    });
    
    // Adiciona permissões
    await prisma.planilhaPermission.createMany({
      data: [
        {
          planilhaId: planilha1.id,
          userId: incubado1.id,
          canView: true,
          canEdit: true
        },
        {
          planilhaId: planilha1.id,
          userId: incubado2.id,
          canView: true,
          canEdit: false
        }
      ]
    });
    
    console.log('✅ Planilhas criadas');
    
    console.log('\n🎉 Seed concluído com sucesso!');
    console.log('\n📧 Credenciais de teste:');
    console.log('Admin: rose@incubadora2iad.com.br / 123456');
    console.log('Incubado 1: joao@startup.com / 123456');
    console.log('Incubado 2: maria@techcorp.com / 123456');
    
  } catch (error) {
    console.error('❌ Erro no seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed();
