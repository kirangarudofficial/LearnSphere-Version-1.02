import { Module } from '@nestjs/common';
import { RbacController } from './rbac.controller';
import { RbacService } from './rbac.service';
import { PrismaService } from '@shared/database/prisma.service';

@Module({
    controllers: [RbacController],
    providers: [RbacService, PrismaService],
    exports: [RbacService],
})
export class RbacModule { }
