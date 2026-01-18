FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/organization-service ./dist/apps/organization-service
EXPOSE 3014
CMD ["node", "dist/apps/organization-service/main"]
