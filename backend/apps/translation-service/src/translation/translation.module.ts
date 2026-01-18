import { Module } from '@nestjs/common';
import { TranslationController } from './translation.controller';
import { TranslationService } from './translation.service';
import { PrismaService } from '@shared/database/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [TranslationController],
    providers: [TranslationService, PrismaService],
    exports: [TranslationService],
})
export class TranslationModule { }
