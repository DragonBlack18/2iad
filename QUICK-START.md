# 🚀 Guia Rápido de Início - Incubadora 2IAD

## ⚡ Setup Rápido (5 minutos)

### Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL instalado e rodando
- Git instalado
- Editor de código (VS Code recomendado)

### 1️⃣ Clone ou Navegue até o Projeto

```bash
cd "c:\Users\davib\OneDrive\Documentos\Todos os meus conteudos\2iad"
```

### 2️⃣ Configure o Backend

```bash
# Entre na pasta da API
cd api

# Instale as dependências
npm install

# Configure o .env
cp .env.example .env
```

**Edite o arquivo `.env` com suas configurações:**

```env
DATABASE_URL="postgresql://postgres:senha@localhost:5432/incubadora2iad"
JWT_SECRET="meu_secret_super_seguro_123"
PORT=3000
```

```bash
# Gere o cliente Prisma
npm run prisma:generate

# Execute as migrations (cria as tabelas)
npm run prisma:migrate

# Popule o banco com dados de teste
npm run seed

# Inicie o servidor
npm run dev
```

✅ **Backend rodando em http://localhost:3000**

### 3️⃣ Configure o Frontend Público

Abra um NOVO terminal:

```bash
cd "c:\Users\davib\OneDrive\Documentos\Todos os meus conteudos\2iad\public-frontend"

# Instale as dependências
npm install

# Configure o .env
cp .env.example .env

# Inicie o servidor
npm run dev
```

✅ **Frontend Público rodando em http://localhost:5173**

### 4️⃣ Teste o Sistema

#### Credenciais de Teste:

**Super Admin (Rose):**
- Email: `rose@incubadora2iad.com.br`
- Senha: `123456`

**Incubado 1:**
- Email: `joao@startup.com`
- Senha: `123456`

**Incubado 2:**
- Email: `maria@techcorp.com`
- Senha: `123456`

#### Teste as Páginas:

1. **Home**: http://localhost:5173/
2. **Sobre**: http://localhost:5173/sobre
3. **Startups**: http://localhost:5173/startups
4. **Editais**: http://localhost:5173/editais
5. **Parceiros**: http://localhost:5173/parceiros
6. **Contato**: http://localhost:5173/contato

#### Teste a API:

```bash
# Health check
curl http://localhost:3000/health

# Login (obter token)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"rose@incubadora2iad.com.br","password":"123456"}'

# Listar startups
curl http://localhost:3000/api/startups

# Listar editais
curl http://localhost:3000/api/editais

# Listar parceiros
curl http://localhost:3000/api/parceiros
```

---

## 🗄️ Comandos Úteis do Prisma

```bash
# Abrir Prisma Studio (GUI para visualizar o banco)
npm run prisma:studio

# Criar nova migration
npm run prisma:migrate

# Resetar banco (CUIDADO: apaga tudo!)
npx prisma migrate reset

# Recriar o seed
npm run seed
```

---

## 📦 Estrutura de Pastas

```
2iad/
├── api/                      ← Backend (porta 3000)
│   ├── src/
│   │   ├── controllers/     ← Lógica de negócio
│   │   ├── routes/          ← Rotas da API
│   │   ├── middlewares/     ← Auth, errors, upload
│   │   └── server.js        ← Entry point
│   ├── prisma/
│   │   └── schema.prisma    ← Modelo do banco
│   └── package.json
│
├── public-frontend/         ← Site público (porta 5173)
│   ├── src/
│   │   ├── pages/           ← Páginas React
│   │   ├── components/      ← Componentes reutilizáveis
│   │   └── lib/             ← Utils e API client
│   └── package.json
│
├── admin-frontend/          ← Admin (porta 5174) - A IMPLEMENTAR
│   └── package.json
│
└── README.md
```

---

## 🐛 Troubleshooting

### Erro: "Cannot connect to database"

**Solução:**
1. Verifique se o PostgreSQL está rodando
2. Verifique a `DATABASE_URL` no `.env`
3. Crie o banco manualmente: `createdb incubadora2iad`

### Erro: "Port 3000 already in use"

**Solução:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Ou mude a porta no .env
PORT=3001
```

### Erro: "Module not found"

**Solução:**
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Prisma Client not generated"

**Solução:**
```bash
npm run prisma:generate
```

---

## 📚 Documentação Completa

- [README.md](README.md) - Visão geral e guia completo
- [API-DOCS.md](API-DOCS.md) - Documentação da API
- [ARCHITECTURE.md](ARCHITECTURE.md) - Arquitetura do sistema
- [STATUS.md](STATUS.md) - Status e pendências

---

## 🎯 Próximos Passos

1. ✅ Explorar o site público em http://localhost:5173
2. ✅ Testar a API em http://localhost:3000/api
3. ✅ Visualizar dados no Prisma Studio
4. ⚠️ Implementar o frontend admin
5. ⚠️ Customizar conforme necessário
6. ⚠️ Adicionar seus próprios dados

---

## 🆘 Precisa de Ajuda?

**Passo a passo completo:**
1. Leia o [README.md](README.md)
2. Consulte a [API-DOCS.md](API-DOCS.md)
3. Veja a [ARCHITECTURE.md](ARCHITECTURE.md)
4. Confira o [STATUS.md](STATUS.md)

**Contato:**
- Email: contato@incubadora2iad.com.br

---

**Boa sorte! 🚀**
