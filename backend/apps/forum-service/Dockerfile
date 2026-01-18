FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/forum-service ./dist/apps/forum-service
EXPOSE 3021
CMD ["node", "dist/apps/forum-service/main"]
