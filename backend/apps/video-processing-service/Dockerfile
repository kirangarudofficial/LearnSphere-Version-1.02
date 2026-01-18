FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN npm run build video-processing-service

FROM node:18-alpine
WORKDIR /app

# Install FFmpeg for video processing
RUN apk add --no-cache ffmpeg

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3015
CMD ["node", "dist/apps/video-processing-service/main"]
