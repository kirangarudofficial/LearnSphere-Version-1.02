FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/billing-service ./dist/apps/billing-service
EXPOSE 3024
CMD ["node", "dist/apps/billing-service/main"]
