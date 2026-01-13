# 📊 Diagrama de Arquitetura - Incubadora 2IAD

## Visão Geral

```
┌─────────────────────────────────────────────────────────────┐
│                        USUÁRIOS                             │
├──────────────────┬───────────────────┬──────────────────────┤
│   Público Web    │  Incubados        │  Super Admin (Rose)  │
└────────┬─────────┴─────────┬─────────┴──────────┬───────────┘
         │                   │                    │
         ▼                   ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  Site Público   │  │  Área Incubado  │  │  Painel Admin   │
│  (React/Vite)   │  │  (React/Vite)   │  │  (React/Vite)   │
│  Port: 5173     │  │  Port: 5174     │  │  Port: 5174     │
└────────┬────────┘  └────────┬────────┘  └────────┬─────────┘
         │                    │                     │
         └────────────────────┴─────────────────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │    API REST          │
                   │  (Express/Node.js)   │
                   │    Port: 3000        │
                   └──────────┬───────────┘
                              │
         ┏━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━━━━━━┓
         ▼                                          ▼
┌─────────────────┐                      ┌─────────────────┐
│  Prisma ORM     │                      │  Middlewares    │
└────────┬────────┘                      └─────────────────┘
         │                                │ - Auth (JWT)    │
         │                                │ - CORS          │
         ▼                                │ - Rate Limit    │
┌─────────────────┐                      │ - Error Handler │
│  PostgreSQL     │                      │ - Upload        │
│   Database      │                      └─────────────────┘
└─────────────────┘
```

## Fluxo de Dados

### 1. Autenticação

```
[Cliente] → POST /api/auth/login
           ↓
    [API: Auth Controller]
           ↓
    [Verificação de credenciais]
           ↓
    [Geração de JWT Token]
           ↓
    [Retorno do Token + Dados do Usuário]
```

### 2. Requisição Protegida

```
[Cliente] → GET /api/startups + Bearer Token
           ↓
    [Middleware: authenticate]
           ↓
    [Validação do Token JWT]
           ↓
    [Anexa req.user com dados do usuário]
           ↓
    [Controller: getAllStartups]
           ↓
    [Prisma: Query ao banco]
           ↓
    [Retorno dos dados]
```

### 3. CRUD de Startup (Admin)

```
[Admin] → POST /api/startups + Token + Dados
         ↓
  [Middleware: authenticate]
         ↓
  [Middleware: authorize('SUPER_ADMIN')]
         ↓
  [Validação com Zod]
         ↓
  [Controller: createStartup]
         ↓
  [Prisma: create()]
         ↓
  [Log da ação]
         ↓
  [Retorno da startup criada]
```

## Estrutura de Pastas

### Backend (API)

```
api/
├── prisma/
│   └── schema.prisma          # Schema do banco de dados
├── src/
│   ├── config/
│   │   └── database.js        # Configuração do Prisma
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── startupsController.js
│   │   ├── editaisController.js
│   │   ├── parceirosController.js
│   │   └── planilhasController.js
│   ├── middlewares/
│   │   ├── auth.js            # JWT authentication
│   │   ├── errorHandler.js    # Error handling
│   │   └── upload.js          # File upload (Multer)
│   ├── routes/
│   │   ├── index.js           # Routes aggregator
│   │   ├── auth.js
│   │   ├── startups.js
│   │   ├── editais.js
│   │   ├── parceiros.js
│   │   ├── planilhas.js
│   │   └── media.js
│   ├── utils/
│   │   └── seed.js            # Database seeding
│   └── server.js              # Entry point
├── uploads/                    # Uploaded files
├── .env                        # Environment variables
├── .env.example
├── .gitignore
└── package.json
```

### Frontend Público

```
public-frontend/
├── src/
│   ├── components/
│   │   ├── ui/                # Shadcn/UI components
│   │   │   ├── button.jsx
│   │   │   └── card.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   ├── lib/
│   │   ├── api.js             # Axios configuration
│   │   └── utils.js           # Utility functions
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Sobre.jsx
│   │   ├── Startups.jsx
│   │   ├── StartupDetail.jsx
│   │   ├── Editais.jsx
│   │   ├── Parceiros.jsx
│   │   ├── Contato.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx                # Router configuration
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
└── package.json
```

### Frontend Admin

```
admin-frontend/
├── src/
│   ├── components/
│   │   ├── ui/                # Shadcn/UI components
│   │   ├── Layout.jsx
│   │   └── ProtectedRoute.jsx
│   ├── lib/
│   │   ├── api.js
│   │   └── auth.js            # Auth context/hooks
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Startups.jsx
│   │   ├── Editais.jsx
│   │   ├── Parceiros.jsx
│   │   ├── Planilhas.jsx
│   │   └── Users.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── package.json
```

## Modelo de Dados (ER Diagram)

```
┌─────────────┐       ┌──────────────────┐       ┌─────────────┐
│    User     │       │  StartupMember   │       │   Startup   │
├─────────────┤       ├──────────────────┤       ├─────────────┤
│ id (PK)     │──────<│ userId (FK)      │>──────│ id (PK)     │
│ email       │       │ startupId (FK)   │       │ name        │
│ password    │       │ role             │       │ slug        │
│ name        │       └──────────────────┘       │ description │
│ role        │                                  │ segment     │
│ active      │                                  │ status      │
└─────┬───────┘                                  └─────┬───────┘
      │                                                │
      │                                                │
      │       ┌──────────────────────┐                │
      └──────<│ PlanilhaPermission   │                │
              ├──────────────────────┤                │
              │ id (PK)              │                │
              │ planilhaId (FK)      │>───────┐       │
              │ userId (FK)          │        │       │
              │ canEdit              │        │       │
              │ canView              │        │       │
              └──────────────────────┘        │       │
                                              │       │
┌─────────────┐       ┌──────────────┐       │       │
│  Planilha   │       │ PlanilhaRow  │       │       │
├─────────────┤       ├──────────────┤       │       │
│ id (PK)     │──────<│ planilhaId   │<──────┘       │
│ name        │       │ rowIndex     │               │
│ description │       │ data (JSON)  │               │
└─────────────┘       └──────────────┘               │
                                                      │
┌─────────────┐                                      │
│   Edital    │                                      │
├─────────────┤                                      │
│ id (PK)     │                                      │
│ title       │                                      │
│ slug        │                                      │
│ description │                                      │
│ pdfUrl      │                                      │
│ status      │                                      │
│ startDate   │                                      │
│ endDate     │                                      │
└─────────────┘                                      │
                                                      │
┌─────────────┐                                      │
│  Parceiro   │                                      │
├─────────────┤                                      │
│ id (PK)     │                                      │
│ name        │                                      │
│ slug        │                                      │
│ description │                                      │
│ logoUrl     │                                      │
│ website     │                                      │
└─────────────┘                                      │
                                                      │
┌─────────────┐                                      │
│    Media    │                                      │
├─────────────┤                                      │
│ id (PK)     │                                      │
│ filename    │                                      │
│ path        │                                      │
│ type        │                                      │
│ startupId   │>─────────────────────────────────────┘
└─────────────┘

┌─────────────┐
│     Log     │
├─────────────┤
│ id (PK)     │
│ userId (FK) │
│ action      │
│ entity      │
│ entityId    │
│ details     │
└─────────────┘
```

## Stack de Tecnologias

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Zod
- **File Upload**: Multer
- **Email**: Nodemailer
- **Security**: bcrypt, CORS, rate-limit

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Styling**: TailwindCSS
- **UI Components**: Shadcn/UI (Radix UI)
- **Form Validation**: Zod
- **Icons**: Lucide React

### DevOps & Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Code Quality**: ESLint, Prettier
- **Environment**: dotenv

## Segurança

### Autenticação & Autorização
- JWT tokens com expiração configurável
- Refresh tokens (pode ser implementado)
- Bcrypt para hash de senhas (salt rounds: 10)
- Middleware de autorização baseado em roles

### Proteções
- Rate limiting (100 req/15min)
- CORS configurado
- Helmet.js (pode ser adicionado)
- Validação de inputs com Zod
- SQL injection prevention (Prisma)
- XSS protection

## Deployment

### Backend
```bash
# Build
npm run build

# Migrations
npm run prisma:migrate

# Start
npm start
```

### Frontend
```bash
# Build
npm run build

# Preview
npm run preview
```

### Variáveis de Ambiente Necessárias

**Produção:**
- `DATABASE_URL`: Connection string do PostgreSQL
- `JWT_SECRET`: Secret forte e único
- `NODE_ENV`: production
- `SMTP_*`: Configurações de email
- `PUBLIC_URL`: URL do site público
- `ADMIN_URL`: URL do painel admin

## Escalabilidade

### Possíveis Melhorias
1. **Cache**: Redis para cache de queries frequentes
2. **CDN**: Para arquivos estáticos e uploads
3. **Load Balancer**: Para múltiplas instâncias da API
4. **Message Queue**: Para processamento assíncrono
5. **Microserviços**: Separar funcionalidades em serviços independentes
6. **WebSockets**: Para planilhas colaborativas em tempo real
7. **Elasticsearch**: Para busca avançada
8. **Monitoring**: Sentry, LogRocket, DataDog

## Monitoramento & Logs

- Logs estruturados salvos no banco (tabela `logs`)
- Console logs para desenvolvimento
- Sistema de logs pode ser expandido com Winston/Pino
- Métricas podem ser coletadas com Prometheus
