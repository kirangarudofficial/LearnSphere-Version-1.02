FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/analytics-service ./dist/apps/analytics-service
EXPOSE 3028
CMD ["node", "dist/apps/analytics-service/main"]
