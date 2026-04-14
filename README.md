# 🚀 Plataforma SaaS - Incubadora 2IAD

Sistema completo de gestão para incubadora de startups com módulos de editais, gestão de parceiros, planilhas colaborativas e sistema de mídia.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [API Endpoints](#api-endpoints)
- [Contribuindo](#contribuindo)

## 🎯 Sobre o Projeto

A Plataforma 2IAD é um SaaS completo desenvolvido para gerenciar todo o ecossistema de uma incubadora de startups, incluindo:

- **Gestão de Editais**: Criação e controle de processos seletivos
- **Gestão de Parceiros**: Cadastro e acompanhamento de parceiros estratégicos
- **Sistema de Planilhas**: Planilhas colaborativas estilo Excel com permissões
- **Gestão de Mídia**: Upload e organização de arquivos
- **Painel Administrativo**: Dashboard completo com analytics
- **Sistema Multi-tenant**: Isolamento de dados por startup

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                            │
│  ┌──────────────────┐          ┌──────────────────┐         │
│  │  Public Frontend │          │  Admin Dashboard │         │
│  │   (Port 5173)    │          │    (Port 5174)   │         │
│  └──────────────────┘          └──────────────────┘         │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      API LAYER                               │
│                  REST API (Port 3000)                        │
│  ┌──────────────────────────────────────────────────┐       │
│  │  Express.js + JWT Auth + RBAC Middleware          │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                            │
│               PostgreSQL 15 (Port 5432)                      │
│  ┌──────────────────────────────────────────────────┐       │
│  │  Prisma ORM + Multi-tenant Schema                 │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

## 💻 Tecnologias

### Backend
- **Node.js 18** - Runtime JavaScript
- **Express.js** - Framework web
- **Prisma ORM** - Database toolkit
- **PostgreSQL 15** - Banco de dados relacional
- **JWT** - Autenticação stateless
- **Bcrypt** - Hash de senhas
- **Multer** - Upload de arquivos

### Frontend Admin
- **React 18** - Biblioteca UI
- **Vite 5** - Build tool
- **React Router v6** - Roteamento
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework CSS
- **React Spreadsheet** - Componente de planilhas

### Frontend Público
- **HTML5/CSS3/JavaScript** - Stack tradicional
- **Three.js** - Animações 3D

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração
- **Git** - Controle de versão

## 🚀 Instalação

### Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado
- [Git](https://git-scm.com/) instalado

### Instalação Rápida (Docker)

1. **Clone o repositório**
```bash
git clone <repository-url>
cd 2iad
```

2. **Configure as variáveis de ambiente**
```bash
# Backend (.env na raiz da pasta api/)
cp api/.env.example api/.env

# Frontend Admin (.env na raiz da pasta admin-frontend/)
cp admin-frontend/.env.example admin-frontend/.env
```

3. **Inicie os containers**
```bash
docker compose up -d
```

4. **Execute as migrations**
```bash
docker exec -it 2iad-api npx prisma migrate deploy
```

5. **Popule o banco de dados (opcional)**
```bash
docker exec -it 2iad-api node src/utils/seed.js
```

### Instalação Manual (Sem Docker)

#### Backend

```bash
cd api
npm install
npx prisma generate
npx prisma migrate deploy
node src/utils/seed.js
npm run dev
```

#### Admin Frontend

```bash
cd admin-frontend
npm install
npm run dev
```

#### Frontend Público

```bash
cd incubadora-frontend
# Serve com qualquer servidor HTTP
python -m http.server 5173
```

## 🎮 Uso

### Acessos

**Admin Dashboard**: http://localhost:5174
- Email: `rose@incubadora2iad.com.br`
- Senha: `123456`
- Perfil: SUPER_ADMIN

**Frontend Público**: http://localhost:5173

**API**: http://localhost:3000
- Documentação: http://localhost:3000/

### Credenciais de Teste

#### Super Admin
- Email: `rose@incubadora2iad.com.br`
- Senha: `123456`
- Permissões: Acesso total

#### Usuário Padrão
- Email: `joao@startup1.com`
- Senha: `123456`
- Permissões: Acesso limitado à sua startup

## 📁 Estrutura do Projeto

```
2iad/
├── api/                          # Backend REST API
│   ├── prisma/
│   │   └── schema.prisma         # Schema do banco de dados
│   ├── src/
│   │   ├── config/               # Configurações
│   │   ├── controllers/          # Controladores
│   │   ├── middlewares/          # Middlewares (auth, RBAC, etc)
│   │   ├── models/               # Modelos Prisma
│   │   ├── routes/               # Rotas da API
│   │   ├── utils/                # Utilitários
│   │   ├── app.js                # Configuração Express
│   │   └── server.js             # Entry point
│   ├── uploads/                  # Arquivos enviados
│   ├── .env                      # Variáveis de ambiente
│   ├── package.json
│   └── Dockerfile
│
├── admin-frontend/               # Dashboard Administrativo
│   ├── src/
│   │   ├── components/           # Componentes React
│   │   │   ├── EditableCell.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── Spreadsheet.css
│   │   │   └── SpreadsheetViewer.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx   # Context de autenticação
│   │   ├── pages/                # Páginas
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── EditaisPage.jsx
│   │   │   ├── ParceirosPage.jsx
│   │   │   ├── PlanilhasPage.jsx
│   │   │   ├── PlanilhaDetailPage.jsx
│   │   │   ├── CreatePlanilhaPage.jsx
│   │   │   └── MediaPage.jsx
│   │   ├── services/
│   │   │   └── api.js            # Cliente API
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── Dockerfile
│
├── incubadora-frontend/          # Site Público
│   ├── pages/
│   ├── assets/
│   ├── css/
│   ├── js/
│   └── index.html
│
├── docker-compose.yml            # Orquestração Docker
└── README.md                     # Este arquivo
```

## ✨ Funcionalidades

### Módulo de Editais
- ✅ Criar, editar e excluir editais
- ✅ Definir status (ABERTO/ENCERRADO)
- ✅ Configurar datas de abertura e encerramento
- ✅ Anexar documentos e requisitos

### Módulo de Parceiros
- ✅ Cadastro de parceiros estratégicos
- ✅ Upload de logotipos
- ✅ Status de ativação
- ✅ Gestão de contratos

### Sistema de Planilhas
- ✅ Criação de planilhas colaborativas
- ✅ Colunas tipadas (TEXT, NUMBER, DATE, BOOLEAN)
- ✅ Edição inline estilo Excel
- ✅ Sistema de permissões (READ/WRITE/OWNER)
- ✅ Adicionar/remover colunas dinamicamente
- ✅ Adicionar/remover linhas
- ✅ Auto-save em tempo real
- ✅ Exportação para CSV
- ✅ Copy/Paste (Ctrl+C/V)
- ✅ Navegação por teclado

### Gestão de Mídia
- ✅ Upload de múltiplos arquivos
- ✅ Organização por pastas
- ✅ Preview de imagens
- ✅ Metadados de arquivos

### Painel Administrativo
- ✅ Dashboard com estatísticas
- ✅ Gráficos de performance
- ✅ Logs de atividades
- ✅ Gestão de usuários

## 🔌 API Endpoints

### Autenticação
```
POST   /api/auth/login          # Login de usuário
POST   /api/auth/register       # Registro de usuário
GET    /api/auth/me             # Dados do usuário logado
```

### Editais
```
GET    /api/editais             # Listar todos editais
GET    /api/editais/:id         # Buscar edital por ID
POST   /api/editais             # Criar novo edital (SUPER_ADMIN)
PUT    /api/editais/:id         # Atualizar edital (SUPER_ADMIN)
DELETE /api/editais/:id         # Deletar edital (SUPER_ADMIN)
```

### Parceiros
```
GET    /api/parceiros           # Listar todos parceiros
GET    /api/parceiros/:id       # Buscar parceiro por ID
POST   /api/parceiros           # Criar parceiro (SUPER_ADMIN)
PUT    /api/parceiros/:id       # Atualizar parceiro (SUPER_ADMIN)
DELETE /api/parceiros/:id       # Deletar parceiro (SUPER_ADMIN)
```

### Planilhas
```
GET    /api/planilhas           # Listar planilhas do usuário
GET    /api/planilhas/:id       # Buscar planilha por ID
POST   /api/planilhas           # Criar nova planilha
PUT    /api/planilhas/:id       # Atualizar planilha
DELETE /api/planilhas/:id       # Deletar planilha
POST   /api/planilhas/:id/colunas        # Adicionar coluna
POST   /api/planilhas/:id/linhas         # Adicionar linha
PUT    /api/planilhas/celulas/:id        # Atualizar célula
```

### Mídia
```
GET    /api/media               # Listar arquivos
POST   /api/media/upload        # Upload de arquivo
DELETE /api/media/:id           # Deletar arquivo
```

Documentação completa: **[API.md](api/API.md)**

## 🐳 Deploy

### Produção com Docker

1. **Configure variáveis de produção**
```bash
# api/.env
DATABASE_URL="postgresql://user:pass@db:5432/prod"
JWT_SECRET="your-super-secret-key"
NODE_ENV="production"

# admin-frontend/.env
VITE_API_URL="https://api.seu-dominio.com"
```

2. **Build para produção**
```bash
docker compose -f docker-compose.prod.yml up -d --build
```

3. **Configure nginx como reverse proxy**
```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location /api {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        proxy_pass http://localhost:5174;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Deploy Manual

Veja guia completo em **[DEPLOYMENT.md](DEPLOYMENT.md)**

## 🤝 Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, entre em contato:
- Email: davibrandzoletti11@gmail.com
---

Desenvolvido com ❤️ pela equipe 2IAD
