# 🐳 Guia Docker - Incubadora 2IAD

## 📦 O que foi configurado

- **PostgreSQL 15**: Banco de dados rodando na porta `5432`
- **Backend API**: Node.js + Express + Prisma na porta `3000`
- **Frontend Público**: React + Vite + TailwindCSS na porta `5173`
- **Network**: `2iad-network` conectando todos os serviços
- **Volumes**: Persistência de dados do PostgreSQL

## 🚀 Como iniciar

### 1. Subir todos os serviços

```bash
docker-compose up -d
```

### 2. Ver logs em tempo real

```bash
# Todos os serviços
docker-compose logs -f

# Apenas a API
docker-compose logs -f api

# Apenas o frontend
docker-compose logs -f frontend
```

### 3. Verificar status dos containers

```bash
docker-compose ps
```

## 🌐 URLs de Acesso

- **Frontend Público**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **PostgreSQL**: localhost:5432

### Endpoints da API

- `GET http://localhost:3000/api/health` - Health check
- `POST http://localhost:3000/api/auth/register` - Registro
- `POST http://localhost:3000/api/auth/login` - Login
- `GET http://localhost:3000/api/startups` - Listar startups
- `GET http://localhost:3000/api/editais` - Listar editais
- `GET http://localhost:3000/api/parceiros` - Listar parceiros

## 🔧 Comandos Úteis

### Parar todos os serviços

```bash
docker-compose down
```

### Parar e remover volumes (apaga banco de dados)

```bash
docker-compose down -v
```

### Reconstruir as imagens

```bash
docker-compose build --no-cache
```

### Reiniciar um serviço específico

```bash
docker-compose restart api
docker-compose restart frontend
docker-compose restart postgres
```

### Acessar shell de um container

```bash
# API
docker exec -it 2iad-api sh

# Frontend
docker exec -it 2iad-frontend sh

# PostgreSQL
docker exec -it 2iad-postgres psql -U postgres -d incubadora2iad
```

## 🗃️ Gerenciar Banco de Dados

### Criar migration

```bash
docker exec -it 2iad-api npx prisma migrate dev --name nome_da_migration
```

### Executar seed (popular banco com dados de teste)

```bash
docker exec -it 2iad-api npm run seed
```

### Ver dados no Prisma Studio

```bash
docker exec -it 2iad-api npx prisma studio
```

Acesse: http://localhost:5555

### Resetar banco de dados

```bash
docker exec -it 2iad-api npx prisma migrate reset
```

## 🔑 Credenciais Padrão

### PostgreSQL

- **Host**: localhost
- **Porta**: 5432
- **Usuário**: postgres
- **Senha**: postgres123
- **Database**: incubadora2iad

### Usuário Admin (após seed)

- **Email**: admin@2iad.com
- **Senha**: Admin123!

## 🛠️ Troubleshooting

### Container não inicia

```bash
# Ver logs de erro
docker-compose logs api
docker-compose logs frontend

# Reconstruir
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Erro de conexão com banco de dados

```bash
# Verificar se o PostgreSQL está rodando
docker-compose ps postgres

# Reiniciar o PostgreSQL
docker-compose restart postgres

# Aguardar health check e reiniciar API
docker-compose restart api
```

### Porta já em uso

Se alguma porta já estiver em uso, edite o `docker-compose.yml`:

```yaml
# Para mudar a porta do frontend de 5173 para 3001
frontend:
  ports:
    - "3001:5173"  # localhost:3001 -> container:5173
```

### Hot reload não funciona

O hot reload está configurado para funcionar automaticamente. Se não estiver funcionando:

1. Verifique se os volumes estão montados corretamente no `docker-compose.yml`
2. Reinicie o container: `docker-compose restart frontend`

## 📊 Network

Todos os serviços estão na mesma network `2iad-network`:

- **postgres**: Acessível via `postgres:5432` dentro da network
- **api**: Acessível via `api:3000` dentro da network
- **frontend**: Acessível via `frontend:5173` dentro da network

## 🔄 Atualizar código

Os volumes estão configurados para hot reload:

- **API**: Qualquer alteração no código é refletida automaticamente (nodemon)
- **Frontend**: Qualquer alteração no código é refletida automaticamente (Vite HMR)

Não é necessário reiniciar os containers após editar o código!

## 📦 Instalar nova dependência

### No Backend

```bash
# Adicionar dependência
docker exec -it 2iad-api npm install nome-do-pacote

# Reconstruir imagem (recomendado)
docker-compose build api
docker-compose up -d api
```

### No Frontend

```bash
# Adicionar dependência
docker exec -it 2iad-frontend npm install nome-do-pacote

# Reconstruir imagem (recomendado)
docker-compose build frontend
docker-compose up -d frontend
```

## 🎯 Fluxo de Desenvolvimento

1. **Iniciar containers**: `docker-compose up -d`
2. **Editar código**: Os arquivos são sincronizados automaticamente
3. **Ver logs**: `docker-compose logs -f`
4. **Testar no navegador**: http://localhost:5173
5. **Parar**: `docker-compose down` (quando terminar)

## 🚀 Deploy para Produção

Para produção, você precisará:

1. Mudar `NODE_ENV` para `production`
2. Usar build do Vite com Nginx
3. Configurar variáveis de ambiente seguras
4. Usar secrets para senhas
5. Configurar SSL/HTTPS

Consulte `ARCHITECTURE.md` para detalhes de deploy.
