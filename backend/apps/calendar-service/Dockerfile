FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/calendar-service ./dist/apps/calendar-service
EXPOSE 3039
CMD ["node", "dist/apps/calendar-service/main"]
