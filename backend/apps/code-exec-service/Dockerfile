FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/code-exec-service ./dist/apps/code-exec-service
EXPOSE 3033
CMD ["node", "dist/apps/code-exec-service/main"]
