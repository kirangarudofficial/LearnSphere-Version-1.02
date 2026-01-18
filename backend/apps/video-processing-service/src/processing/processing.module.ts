import { Module } from '@nestjs/common';
import { ProcessingController } from './processing.controller';
import { ProcessingService } from './processing.service';
import { PrismaService } from '@shared/database/prisma.service';

@Module({
    controllers: [ProcessingController],
    providers: [ProcessingService, PrismaService],
    exports: [ProcessingService],
})
export class ProcessingModule { }
