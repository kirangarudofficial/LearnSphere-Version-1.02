FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/assessment-service ./dist/apps/assessment-service
EXPOSE 3009
CMD ["node", "dist/apps/assessment-service/main"]
