FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/survey-service ./dist/apps/survey-service
EXPOSE 3041
CMD ["node", "dist/apps/survey-service/main"]
