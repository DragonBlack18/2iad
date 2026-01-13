# Backend API Dockerfile
FROM node:18-alpine

WORKDIR /app

# Instalar dependências do sistema necessárias para o Prisma
RUN apk add --no-cache openssl

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências (incluindo dev para nodemon)
RUN npm install

# Copiar arquivos do projeto
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Expor porta da API
EXPOSE 3000

# Script de inicialização que roda migrations e inicia o servidor
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
