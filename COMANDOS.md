# ⚡ Comandos Essenciais - Incubadora 2IAD

## 🚀 Inicialização do Sistema

### Backend (API)

```powershell
# Navegar até a pasta da API
cd "c:\Users\davib\OneDrive\Documentos\Todos os meus conteudos\2iad\api"

# Primeira vez: Instalar dependências
npm install

# Primeira vez: Configurar ambiente
cp .env.example .env
# Edite o .env com suas configurações

# Primeira vez: Configurar banco de dados
npm run prisma:generate
npm run prisma:migrate
npm run seed

# Iniciar servidor de desenvolvimento
npm run dev

# Servidor rodará em: http://localhost:3000
```

### Frontend Público

```powershell
# Abrir novo terminal
# Navegar até a pasta do frontend público
cd "c:\Users\davib\OneDrive\Documentos\Todos os meus conteudos\2iad\public-frontend"

# Primeira vez: Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Site rodará em: http://localhost:5173
```

---

## 🗄️ Banco de Dados (Prisma)

```powershell
# Navegar até a pasta da API
cd api

# Abrir Prisma Studio (interface visual do banco)
npm run prisma:studio

# Gerar cliente Prisma (após alterar schema.prisma)
npm run prisma:generate

# Criar nova migration
npm run prisma:migrate

# Resetar banco (CUIDADO: apaga todos os dados!)
npx prisma migrate reset

# Popular banco com dados de exemplo
npm run seed

# Ver status das migrations
npx prisma migrate status
```

---

## 🧪 Testes da API

### Usando curl (Windows PowerShell)

```powershell
# Health check
curl http://localhost:3000/health

# Login como admin
curl -X POST http://localhost:3000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"rose@incubadora2iad.com.br","password":"123456"}'

# Listar startups (público)
curl http://localhost:3000/api/startups

# Listar editais (público)
curl http://localhost:3000/api/editais

# Listar parceiros (público)
curl http://localhost:3000/api/parceiros

# Obter detalhes de uma startup
curl http://localhost:3000/api/startups/techvision-ai

# Criar startup (admin - precisa do token)
$token = "SEU_TOKEN_AQUI"
curl -X POST http://localhost:3000/api/startups `
  -H "Authorization: Bearer $token" `
  -H "Content-Type: application/json" `
  -d '{"name":"Nova Startup","description":"Descrição","segment":"Tecnologia"}'
```

### Usando Invoke-RestMethod (PowerShell nativo)

```powershell
# Login
$loginResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"rose@incubadora2iad.com.br","password":"123456"}'

$token = $loginResponse.token

# Usar o token em requisições
$headers = @{
  "Authorization" = "Bearer $token"
  "Content-Type" = "application/json"
}

# Criar startup
Invoke-RestMethod -Uri "http://localhost:3000/api/startups" `
  -Method POST `
  -Headers $headers `
  -Body '{"name":"Nova Startup","description":"Teste","segment":"Tech"}'

# Listar startups
Invoke-RestMethod -Uri "http://localhost:3000/api/startups"
```

---

## 📦 Build para Produção

### Backend

```powershell
cd api

# Instalar apenas dependências de produção
npm install --production

# Executar migrations
npm run prisma:migrate

# Iniciar em produção
npm start
```

### Frontend

```powershell
cd public-frontend

# Build para produção
npm run build

# Arquivos estarão em: dist/

# Preview do build
npm run preview
```

---

## 🔧 Manutenção

### Atualizar Dependências

```powershell
# Verificar atualizações disponíveis
npm outdated

# Atualizar todas as dependências
npm update

# Atualizar dependências major (cuidado!)
npx npm-check-updates -u
npm install
```

### Limpar Cache

```powershell
# Limpar node_modules e reinstalar
rm -r node_modules
rm package-lock.json
npm install

# Limpar cache do npm
npm cache clean --force
```

---

## 🐛 Debug

### Ver Logs do Servidor

```powershell
# Backend roda com nodemon, logs aparecem no terminal
cd api
npm run dev

# Ver apenas erros
npm run dev 2>&1 | Select-String "error"
```

### Verificar Porta em Uso

```powershell
# Ver processos usando a porta 3000
netstat -ano | findstr :3000

# Matar processo (substitua PID)
taskkill /PID <PID_DO_PROCESSO> /F

# Ver processos usando a porta 5173
netstat -ano | findstr :5173
```

### Reiniciar Servidor

```powershell
# Ctrl+C para parar o servidor
# Depois executar novamente:
npm run dev
```

---

## 📁 Estrutura de Arquivos Importantes

```powershell
# Ver estrutura do projeto
tree /F

# Ver apenas pastas principais
tree /A

# Navegar entre pastas
cd api                    # Backend
cd public-frontend        # Site público
cd admin-frontend         # Admin (a implementar)
```

---

## 🔐 Credenciais de Teste

### Super Admin (Rose)
```
Email: rose@incubadora2iad.com.br
Senha: 123456
```

### Incubados
```
Email: joao@startup.com
Senha: 123456

Email: maria@techcorp.com
Senha: 123456
```

---

## 📊 URLs Importantes

### Desenvolvimento
- **API Backend:** http://localhost:3000
- **API Docs:** http://localhost:3000/api
- **Health Check:** http://localhost:3000/health
- **Site Público:** http://localhost:5173
- **Prisma Studio:** http://localhost:5555 (após `npm run prisma:studio`)

### Páginas do Site
- Home: http://localhost:5173/
- Sobre: http://localhost:5173/sobre
- Startups: http://localhost:5173/startups
- Editais: http://localhost:5173/editais
- Parceiros: http://localhost:5173/parceiros
- Contato: http://localhost:5173/contato

---

## 🚨 Comandos de Emergência

### Resetar Tudo

```powershell
# Parar todos os servidores (Ctrl+C em cada terminal)

# Resetar banco de dados
cd api
npx prisma migrate reset
npm run seed

# Limpar e reinstalar dependências
rm -r node_modules
npm install

# Reiniciar
npm run dev
```

### Backup do Banco

```powershell
# Fazer backup do banco PostgreSQL
pg_dump incubadora2iad > backup.sql

# Restaurar backup
psql incubadora2iad < backup.sql
```

---

## 📝 Git (Controle de Versão)

```powershell
# Inicializar repositório (se ainda não tiver)
git init

# Adicionar arquivos
git add .

# Commit
git commit -m "Implementação completa da plataforma 2IAD"

# Ver status
git status

# Ver histórico
git log --oneline

# Criar branch
git checkout -b feature/nova-funcionalidade

# Ver diferenças
git diff
```

---

## 🎨 Aliases Úteis (Opcional)

Adicione ao seu perfil do PowerShell para facilitar:

```powershell
# Abrir perfil do PowerShell
notepad $PROFILE

# Adicionar aliases:
function Start-2IAD-API {
  cd "c:\Users\davib\OneDrive\Documentos\Todos os meus conteudos\2iad\api"
  npm run dev
}

function Start-2IAD-Web {
  cd "c:\Users\davib\OneDrive\Documentos\Todos os meus conteudos\2iad\public-frontend"
  npm run dev
}

function Open-2IAD-Prisma {
  cd "c:\Users\davib\OneDrive\Documentos\Todos os meus conteudos\2iad\api"
  npm run prisma:studio
}

# Usar os aliases:
# Start-2IAD-API
# Start-2IAD-Web
# Open-2IAD-Prisma
```

---

## 📖 Documentação

```powershell
# Abrir documentação no navegador padrão
start README.md
start API-DOCS.md
start ARCHITECTURE.md
start STATUS.md
start QUICK-START.md
```

---

## 💡 Dicas

1. **Sempre rode o backend antes do frontend**
2. **Use Prisma Studio para visualizar dados:** `npm run prisma:studio`
3. **Mantenha os .env atualizados**
4. **Faça backups regulares do banco**
5. **Consulte os logs quando houver erros**

---

**Para mais detalhes, consulte:**
- [README.md](README.md) - Guia completo
- [QUICK-START.md](QUICK-START.md) - Início rápido
- [API-DOCS.md](API-DOCS.md) - Documentação da API
