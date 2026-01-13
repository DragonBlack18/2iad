# 📚 Documentação da API - Incubadora 2IAD

## Base URL

```
http://localhost:3000/api
```

## Autenticação

A API usa JWT (JSON Web Tokens) para autenticação. Após o login, inclua o token no header de todas as requisições protegidas:

```
Authorization: Bearer {seu_token}
```

---

## 🔐 Autenticação

### POST /auth/register

Registrar novo usuário

**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123",
  "name": "Nome do Usuário",
  "role": "INCUBADO" // opcional, default: "INCUBADO"
}
```

**Response (201):**
```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "id": "uuid",
    "email": "usuario@email.com",
    "name": "Nome do Usuário",
    "role": "INCUBADO",
    "createdAt": "2026-01-13T10:00:00.000Z"
  }
}
```

### POST /auth/login

Login no sistema

**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "usuario@email.com",
    "name": "Nome do Usuário",
    "role": "INCUBADO"
  }
}
```

### GET /auth/me

Obter dados do usuário autenticado

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "usuario@email.com",
    "name": "Nome do Usuário",
    "role": "INCUBADO",
    "createdAt": "2026-01-13T10:00:00.000Z",
    "startupMembers": []
  }
}
```

### PUT /auth/profile

Atualizar perfil do usuário

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
  "name": "Novo Nome",
  "currentPassword": "senha_atual", // opcional
  "newPassword": "nova_senha" // opcional
}
```

**Response (200):**
```json
{
  "message": "Perfil atualizado com sucesso",
  "user": {
    "id": "uuid",
    "email": "usuario@email.com",
    "name": "Novo Nome",
    "role": "INCUBADO",
    "updatedAt": "2026-01-13T11:00:00.000Z"
  }
}
```

---

## 🚀 Startups

### GET /startups

Listar startups (público)

**Query Params:**
- `status` (string) - Filtrar por status: ATIVA, GRADUADA, INATIVA
- `segment` (string) - Filtrar por segmento
- `search` (string) - Buscar por nome ou descrição

**Response (200):**
```json
{
  "startups": [
    {
      "id": "uuid",
      "name": "TechVision AI",
      "slug": "techvision-ai",
      "description": "Descrição da startup",
      "segment": "Inteligência Artificial",
      "status": "ATIVA",
      "logoUrl": "https://...",
      "website": "https://techvision.ai",
      "instagram": "@techvision_ai",
      "linkedin": "techvision-ai",
      "foundedAt": "2024-01-15T00:00:00.000Z",
      "createdAt": "2026-01-10T10:00:00.000Z",
      "members": [],
      "media": []
    }
  ]
}
```

### GET /startups/:slug

Detalhes de uma startup (público)

**Response (200):**
```json
{
  "startup": {
    "id": "uuid",
    "name": "TechVision AI",
    "slug": "techvision-ai",
    "description": "Descrição completa",
    "segment": "Inteligência Artificial",
    "status": "ATIVA",
    "logoUrl": "https://...",
    "website": "https://techvision.ai",
    "instagram": "@techvision_ai",
    "linkedin": "techvision-ai",
    "foundedAt": "2024-01-15T00:00:00.000Z",
    "members": [
      {
        "id": "uuid",
        "role": "Founder",
        "user": {
          "id": "uuid",
          "name": "João Silva",
          "email": "joao@startup.com"
        }
      }
    ],
    "media": []
  }
}
```

### POST /startups

Criar startup (admin only)

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
  "name": "Nova Startup",
  "description": "Descrição da startup",
  "segment": "Tecnologia",
  "status": "ATIVA",
  "logoUrl": "https://...",
  "website": "https://startup.com",
  "instagram": "@startup",
  "linkedin": "startup",
  "foundedAt": "2025-01-01"
}
```

**Response (201):**
```json
{
  "message": "Startup criada com sucesso",
  "startup": { ... }
}
```

### PUT /startups/:id

Atualizar startup (admin only)

### DELETE /startups/:id

Deletar startup (admin only)

---

## 📄 Editais

### GET /editais

Listar editais (público)

**Query Params:**
- `status` (string) - ABERTO, FECHADO, EM_ANALISE

**Response (200):**
```json
{
  "editais": [
    {
      "id": "uuid",
      "title": "Edital de Seleção 2026",
      "slug": "edital-selecao-2026",
      "description": "Descrição do edital",
      "pdfUrl": "https://...",
      "status": "ABERTO",
      "startDate": "2026-01-01T00:00:00.000Z",
      "endDate": "2026-03-31T00:00:00.000Z",
      "createdAt": "2025-12-01T00:00:00.000Z"
    }
  ]
}
```

### POST /editais

Criar edital (admin only)

**Body:**
```json
{
  "title": "Novo Edital",
  "description": "Descrição",
  "pdfUrl": "https://...",
  "status": "ABERTO",
  "startDate": "2026-01-01",
  "endDate": "2026-03-31"
}
```

---

## 🤝 Parceiros

### GET /parceiros

Listar parceiros (público)

**Response (200):**
```json
{
  "parceiros": [
    {
      "id": "uuid",
      "name": "UNIT Universidade",
      "slug": "unit-universidade",
      "description": "Descrição do parceiro",
      "logoUrl": "https://...",
      "website": "https://unit.br",
      "createdAt": "2026-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## 📊 Planilhas

### GET /planilhas

Listar planilhas (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "planilhas": [
    {
      "id": "uuid",
      "name": "Acompanhamento Janeiro 2026",
      "description": "Planilha de acompanhamento",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "permissions": [],
      "_count": {
        "rows": 10
      }
    }
  ]
}
```

### GET /planilhas/:id

Detalhes de uma planilha

**Response (200):**
```json
{
  "planilha": {
    "id": "uuid",
    "name": "Acompanhamento Janeiro 2026",
    "description": "Planilha de acompanhamento",
    "rows": [
      {
        "id": "uuid",
        "rowIndex": 0,
        "data": {
          "startup": "TechVision AI",
          "mes": "Janeiro",
          "faturamento": 15000,
          "clientes": 5
        }
      }
    ],
    "permissions": [
      {
        "id": "uuid",
        "userId": "uuid",
        "canView": true,
        "canEdit": true,
        "user": {
          "id": "uuid",
          "name": "João Silva",
          "email": "joao@startup.com"
        }
      }
    ]
  }
}
```

### POST /planilhas/:id/rows

Adicionar linha (requer permissão de edição)

**Body:**
```json
{
  "data": {
    "startup": "Nova Startup",
    "mes": "Janeiro",
    "faturamento": 10000,
    "clientes": 3
  }
}
```

### PUT /planilhas/:planilhaId/rows/:rowId

Atualizar linha

**Body:**
```json
{
  "data": {
    "startup": "Startup Atualizada",
    "mes": "Janeiro",
    "faturamento": 12000,
    "clientes": 4
  }
}
```

---

## 📁 Media

### POST /media/upload

Upload de arquivo (admin only)

**Headers:**
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Form Data:**
- `file` (File) - Arquivo a ser enviado
- `startupId` (string, opcional) - ID da startup associada

**Response (201):**
```json
{
  "message": "Arquivo enviado com sucesso",
  "media": {
    "id": "uuid",
    "filename": "1704884400000-123456789.jpg",
    "originalName": "logo.jpg",
    "path": "/uploads/1704884400000-123456789.jpg",
    "type": "IMAGE",
    "size": 52428,
    "mimeType": "image/jpeg",
    "createdAt": "2026-01-13T10:00:00.000Z"
  }
}
```

---

## ❌ Códigos de Erro

- `400` - Bad Request (dados inválidos)
- `401` - Unauthorized (não autenticado)
- `403` - Forbidden (sem permissão)
- `404` - Not Found (recurso não encontrado)
- `500` - Internal Server Error

**Formato de erro:**
```json
{
  "error": "Mensagem de erro",
  "details": {} // opcional
}
```

---

## 🔒 Segurança

- Todas as senhas são hasheadas com bcrypt
- Tokens JWT expiram em 7 dias (configurável)
- Rate limiting: 100 requisições por 15 minutos
- CORS configurado para domínios específicos
- Validação de dados com Zod

---

## 📝 Notas

- Todas as datas estão no formato ISO 8601
- IDs são UUIDs v4
- Paginação pode ser implementada adicionando `page` e `limit` aos query params
- Ordenação pode ser customizada por endpoint
