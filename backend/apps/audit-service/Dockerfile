FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/audit-service ./dist/apps/audit-service
EXPOSE 3032
CMD ["node", "dist/apps/audit-service/main"]
