FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/export-service ./dist/apps/export-service
EXPOSE 3043
CMD ["node", "dist/apps/export-service/main"]
