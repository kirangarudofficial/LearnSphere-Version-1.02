FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/doc-mgmt-service ./dist/apps/doc-mgmt-service
EXPOSE 3034
CMD ["node", "dist/apps/doc-mgmt-service/main"]
