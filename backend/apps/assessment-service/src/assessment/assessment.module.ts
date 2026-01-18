import { Module } from '@nestjs/common';
import { AssessmentController } from './assessment.controller';
import { AssessmentService } from './assessment.service';
import { PrismaService } from '@shared/database/prisma.service';

@Module({
    controllers: [AssessmentController],
    providers: [AssessmentService, PrismaService],
    exports: [AssessmentService],
})
export class AssessmentModule { }
