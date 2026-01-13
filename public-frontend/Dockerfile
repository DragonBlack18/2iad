# Frontend Public Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar arquivos do projeto
COPY . .

# Expor porta do Vite
EXPOSE 5173

# Rodar em modo dev com hot reload
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
