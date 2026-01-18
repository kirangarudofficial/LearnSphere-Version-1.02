FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/recommendation-service ./dist/apps/recommendation-service
EXPOSE 3030
CMD ["node", "dist/apps/recommendation-service/main"]
