FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/moderation-service ./dist/apps/moderation-service
EXPOSE 3023
CMD ["node", "dist/apps/moderation-service/main"]
