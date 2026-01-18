import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.enableCors({ origin: '*' });
    await app.listen(3029);
    console.log(`📊 Reporting Service running on port 3029`);
}
bootstrap();
