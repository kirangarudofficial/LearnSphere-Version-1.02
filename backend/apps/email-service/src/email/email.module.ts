import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { PrismaService } from '@shared/database/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [EmailController],
    providers: [EmailService, PrismaService],
    exports: [EmailService],
})
export class EmailModule { }
