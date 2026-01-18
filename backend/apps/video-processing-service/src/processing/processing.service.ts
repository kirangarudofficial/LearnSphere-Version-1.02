import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';
import { CreateProcessingJobDto } from './dto/create-processing-job.dto';

@Injectable()
export class ProcessingService {
    private readonly logger = new Logger(ProcessingService.name);

    constructor(private readonly prisma: PrismaService) { }

    async createJob(dto: CreateProcessingJobDto) {
        const job = await this.prisma.videoProcessingJob.create({
            data: {
                lessonId: dto.lessonId,
                originalUrl: dto.videoUrl,
                status: 'PENDING',
                progress: 0,
            },
        });

        this.logger.log(`Created processing job: ${job.id}`);

        // Start processing asynchronously
        this.processVideo(job.id).catch((error) => {
            this.logger.error(`Processing failed for job ${job.id}: ${error.message}`);
        });

        return job;
    }

    async getJob(jobId: string) {
        return this.prisma.videoProcessingJob.findUnique({
            where: { id: jobId },
        });
    }

    async getJobsByLesson(lessonId: string) {
        return this.prisma.videoProcessingJob.findMany({
            where: { lessonId },
            orderBy: { createdAt: 'desc' },
        });
    }

    private async processVideo(jobId: string) {
        await this.updateJobStatus(jobId, 'PROCESSING', 10);

        try {
            const job = await this.prisma.videoProcessingJob.findUnique({
                where: { id: jobId },
            });

            // Step 1: Transcode to multiple resolutions (30% progress)
            await this.updateJobStatus(jobId, 'PROCESSING', 20);
            const outputUrls = await this.transcodeVideo(job.originalUrl);
            await this.updateJobStatus(jobId, 'PROCESSING', 50);

            // Step 2: Generate HLS manifest (20% progress)
            const hlsUrl = await this.generateHLSManifest(outputUrls);
            await this.updateJobStatus(jobId, 'PROCESSING', 70);

            // Step 3: Generate thumbnail (10% progress)
            const thumbnailUrl = await this.generateThumbnail(job.originalUrl);
            await this.updateJobStatus(jobId, 'PROCESSING', 85);

            // Step 4: Get video metadata
            const duration = await this.getVideoDuration(job.originalUrl);
            await this.updateJobStatus(jobId, 'PROCESSING', 95);

            // Complete job
            await this.prisma.videoProcessingJob.update({
                where: { id: jobId },
                data: {
                    status: 'COMPLETED',
                    progress: 100,
                    outputUrls,
                    hlsManifestUrl: hlsUrl,
                    thumbnailUrl,
                    duration,
                    completedAt: new Date(),
                },
            });

            this.logger.log(`Job ${jobId} completed successfully`);

            // Publish event: video.processed
            await this.publishVideoProcessedEvent(jobId, job.lessonId, hlsUrl);
        } catch (error) {
            this.logger.error(`Job ${jobId} failed: ${error.message}`);

            await this.prisma.videoProcessingJob.update({
                where: { id: jobId },
                data: {
                    status: 'FAILED',
                    errorMessage: error.message,
                },
            });
        }
    }

    private async transcodeVideo(videoUrl: string): Promise<any> {
        // Simulate FFmpeg transcoding
        this.logger.log('Transcoding video to 360p, 720p, 1080p...');

        await this.delay(2000); // Simulate processing time

        return {
            '360p': `s3://bucket/videos/360p/${Date.now()}.mp4`,
            '720p': `s3://bucket/videos/720p/${Date.now()}.mp4`,
            '1080p': `s3://bucket/videos/1080p/${Date.now()}.mp4`,
        };
    }

    private async generateHLSManifest(outputUrls: any): Promise<string> {
        // Simulate HLS manifest generation
        this.logger.log('Generating HLS manifest...');

        await this.delay(1000);

        return `s3://bucket/manifests/${Date.now()}/playlist.m3u8`;
    }

    private async generateThumbnail(videoUrl: string): Promise<string> {
        // Simulate thumbnail extraction at 5 seconds
        this.logger.log('Generating thumbnail...');

        await this.delay(500);

        return `s3://bucket/thumbnails/${Date.now()}.jpg`;
    }

    private async getVideoDuration(videoUrl: string): Promise<number> {
        // Simulate getting video metadata
        await this.delay(200);

        return 3600; // 1 hour in seconds
    }

    private async updateJobStatus(jobId: string, status: string, progress: number) {
        await this.prisma.videoProcessingJob.update({
            where: { id: jobId },
            data: { status, progress },
        });
    }

    private async publishVideoProcessedEvent(jobId: string, lessonId: string, hlsUrl: string) {
        // TODO: Publish to Kafka
        this.logger.log(`Published event: video.processed for lesson ${lessonId}`);
    }

    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
