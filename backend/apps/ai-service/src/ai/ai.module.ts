import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { PrismaService } from '@shared/database/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [AiController],
    providers: [AiService, PrismaService],
    exports: [AiService],
})
export class AiModule { }
