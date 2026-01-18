FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/admin-service ./dist/apps/admin-service
EXPOSE 3013
CMD ["node", "dist/apps/admin-service/main"]
