FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/support-service ./dist/apps/support-service
EXPOSE 3022
CMD ["node", "dist/apps/support-service/main"]
