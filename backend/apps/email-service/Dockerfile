FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/email-service ./dist/apps/email-service
EXPOSE 3038
CMD ["node", "dist/apps/email-service/main"]
