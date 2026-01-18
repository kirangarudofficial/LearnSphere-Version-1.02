import { Module } from '@nestjs/common';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';
import { PrismaService } from '@shared/database/prisma.service';

@Module({
    controllers: [ExportController],
    providers: [ExportService, PrismaService],
    exports: [ExportService],
})
export class ExportModule { }
