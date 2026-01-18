FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/waitlist-service ./dist/apps/waitlist-service
EXPOSE 3047
CMD ["node", "dist/apps/waitlist-service/main"]
