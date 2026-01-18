import { Module } from '@nestjs/common';
import { WaitlistController } from './waitlist.controller';
import { WaitlistService } from './waitlist.service';
import { PrismaService } from '@shared/database/prisma.service';

@Module({
    controllers: [WaitlistController],
    providers: [WaitlistService, PrismaService],
    exports: [WaitlistService],
})
export class WaitlistModule { }
