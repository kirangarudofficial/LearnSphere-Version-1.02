FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/cart-service ./dist/apps/cart-service
EXPOSE 3025
CMD ["node", "dist/apps/cart-service/main"]
