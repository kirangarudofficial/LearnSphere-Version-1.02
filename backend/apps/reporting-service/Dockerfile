FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/reporting-service ./dist/apps/reporting-service
EXPOSE 3028
CMD ["node", "dist/apps/reporting-service/main"]
