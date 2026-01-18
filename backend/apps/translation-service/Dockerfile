FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/translation-service ./dist/apps/translation-service
EXPOSE 3044
CMD ["node", "dist/apps/translation-service/main"]
