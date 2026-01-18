FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/search-service ./dist/apps/search-service
EXPOSE 3029
CMD ["node", "dist/apps/search-service/main"]
