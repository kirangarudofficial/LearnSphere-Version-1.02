FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/integration-service ./dist/apps/integration-service
EXPOSE 3040
CMD ["node", "dist/apps/integration-service/main"]
