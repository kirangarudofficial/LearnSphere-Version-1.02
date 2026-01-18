import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProcessingService } from './processing.service';
import { CreateProcessingJobDto } from './dto/create-processing-job.dto';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';

@ApiTags('Video Processing')
@Controller('processing')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProcessingController {
    constructor(private readonly processingService: ProcessingService) { }

    @Post('jobs')
    @ApiOperation({ summary: 'Create a new video processing job' })
    async createJob(@Body() dto: CreateProcessingJobDto) {
        return this.processingService.createJob(dto);
    }

    @Get('jobs/:jobId')
    @ApiOperation({ summary: 'Get processing job status' })
    async getJob(@Param('jobId') jobId: string) {
        return this.processingService.getJob(jobId);
    }

    @Get('lessons/:lessonId/jobs')
    @ApiOperation({ summary: 'Get all processing jobs for a lesson' })
    async getJobsByLesson(@Param('lessonId') lessonId: string) {
        return this.processingService.getJobsByLesson(lessonId);
    }
}
