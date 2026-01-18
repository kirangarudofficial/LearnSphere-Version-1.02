FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/marketing-service ./dist/apps/marketing-service
EXPOSE 3045
CMD ["node", "dist/apps/marketing-service/main"]
