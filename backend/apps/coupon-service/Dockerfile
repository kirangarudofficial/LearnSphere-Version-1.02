FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/coupon-service ./dist/apps/coupon-service
EXPOSE 3026
CMD ["node", "dist/apps/coupon-service/main"]
