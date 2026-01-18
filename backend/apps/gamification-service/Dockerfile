FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/gamification-service ./dist/apps/gamification-service
EXPOSE 3012
CMD ["node", "dist/apps/gamification-service/main"]
