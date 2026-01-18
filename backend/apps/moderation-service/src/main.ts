import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.enableCors({ origin: '*' });
    await app.listen(3023);
    console.log(`🛡️ Moderation Service running on port 3023`);
}
bootstrap();
