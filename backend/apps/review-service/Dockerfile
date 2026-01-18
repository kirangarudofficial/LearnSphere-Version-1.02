FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/review-service ./dist/apps/review-service
EXPOSE 3010
CMD ["node", "dist/apps/review-service/main"]
