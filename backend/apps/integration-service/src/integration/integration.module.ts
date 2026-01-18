import { Module } from '@nestjs/common';
import { IntegrationController } from './integration.controller';
import { IntegrationService } from './integration.service';
import { PrismaService } from '@shared/database/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [IntegrationController],
    providers: [IntegrationService, PrismaService],
    exports: [IntegrationService],
})
export class IntegrationModule { }
