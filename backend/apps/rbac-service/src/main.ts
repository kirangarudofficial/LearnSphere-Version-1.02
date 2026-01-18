import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.enableCors({ origin: '*', credentials: true });

    const config = new DocumentBuilder()
        .setTitle('RBAC Service')
        .setDescription('Role-Based Access Control management')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(process.env.PORT || 3013);
    console.log(`🔐 RBAC Service running on port ${process.env.PORT || 3013}`);
}
bootstrap();
