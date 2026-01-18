FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/chat-service ./dist/apps/chat-service
EXPOSE 3020
CMD ["node", "dist/apps/chat-service/main"]
