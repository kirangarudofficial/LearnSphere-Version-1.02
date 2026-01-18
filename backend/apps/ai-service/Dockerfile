FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/ai-service ./dist/apps/ai-service
EXPOSE 3031
CMD ["node", "dist/apps/ai-service/main"]
