FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/webhook-service ./dist/apps/webhook-service
EXPOSE 3027
CMD ["node", "dist/apps/webhook-service/main"]
