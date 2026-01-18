import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';
import { GetStreamDto } from './dto/get-stream.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class StreamingService {
    constructor(private readonly prisma: PrismaService) { }

    async getStream(lessonId: string, userId: string, dto: GetStreamDto) {
        // Get video stream from database
        const stream = await this.prisma.videoStream.findFirst({
            where: { lessonId },
        });

        if (!stream) {
            throw new NotFoundException('Video stream not found');
        }

        // Get user's viewing progress
        const progress = await this.prisma.viewingProgress.findUnique({
            where: {
                userId_videoStreamId: {
                    userId,
                    videoStreamId: stream.id,
                },
            },
        });

        return {
            id: stream.id,
            hlsUrl: stream.hlsManifestUrl,
            dashUrl: stream.dashManifestUrl,
            thumbnailUrl: stream.thumbnailUrl,
            duration: stream.durationSeconds,
            resolutions: stream.resolutions,
            subtitles: stream.subtitles,
            currentTime: progress?.currentTime || 0,
            completed: progress?.completed || false,
        };
    }

    async updateProgress(userId: string, videoStreamId: string, dto: UpdateProgressDto) {
        const completed = dto.currentTime >= dto.duration * 0.9; // 90% watched = completed

        const progress = await this.prisma.viewingProgress.upsert({
            where: {
                userId_videoStreamId: {
                    userId,
                    videoStreamId,
                },
            },
            update: {
                currentTime: dto.currentTime,
                duration: dto.duration,
                completed,
                lastWatchedAt: new Date(),
            },
            create: {
                userId,
                videoStreamId,
                currentTime: dto.currentTime,
                duration: dto.duration,
                completed,
            },
        });

        // Publish event if just completed
        if (completed && !progress.completed) {
            await this.publishVideoCompletedEvent(userId, videoStreamId);
        }

        return { success: true, completed };
    }

    async getAnalytics(videoStreamId: string) {
        const totalViews = await this.prisma.viewingProgress.count({
            where: { videoStreamId },
        });

        const completedViews = await this.prisma.viewingProgress.count({
            where: { videoStreamId, completed: true },
        });

        const avgCompletion = await this.prisma.viewingProgress.aggregate({
            where: { videoStreamId },
            _avg: {
                currentTime: true,
            },
        });

        return {
            totalViews,
            completedViews,
            completionRate: totalViews > 0 ? (completedViews / totalViews) * 100 : 0,
            avgWatchTime: avgCompletion._avg.currentTime || 0,
        };
    }

    private async publishVideoCompletedEvent(userId: string, videoStreamId: string) {
        // TODO: Publish to Kafka
        console.log(`Video completed: user=${userId}, video=${videoStreamId}`);
    }
}
