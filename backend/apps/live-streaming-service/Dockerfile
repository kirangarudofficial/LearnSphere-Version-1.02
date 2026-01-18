FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/live-streaming-service ./dist/apps/live-streaming-service
EXPOSE 3017
CMD ["node", "dist/apps/live-streaming-service/main"]
