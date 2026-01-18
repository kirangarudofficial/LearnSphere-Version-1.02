FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/feature-flag-service ./dist/apps/feature-flag-service
EXPOSE 3035
CMD ["node", "dist/apps/feature-flag-service/main"]
