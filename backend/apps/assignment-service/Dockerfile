FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/assignment-service ./dist/apps/assignment-service
EXPOSE 3019
CMD ["node", "dist/apps/assignment-service/main"]
