FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/rbac-service ./dist/apps/rbac-service
EXPOSE 3013
CMD ["node", "dist/apps/rbac-service/main"]
