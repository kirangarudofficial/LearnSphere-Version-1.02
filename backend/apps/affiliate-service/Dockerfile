FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/affiliate-service ./dist/apps/affiliate-service
EXPOSE 3046
CMD ["node", "dist/apps/affiliate-service/main"]
