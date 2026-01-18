FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/certificate-service ./dist/apps/certificate-service
EXPOSE 3011
CMD ["node", "dist/apps/certificate-service/main"]
