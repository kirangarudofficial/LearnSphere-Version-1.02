import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class GamificationService {
    constructor(private readonly prisma: PrismaService) { }

    async awardPoints(userId: string, points: number, reason: string) {
        const userProfile = await this.prisma.userGamification.upsert({
            where: { userId },
            create: { userId, totalPoints: points, level: 1 },
            update: { totalPoints: { increment: points } },
        });

        await this.prisma.pointsHistory.create({
            data: { userId, points, reason },
        });

        await this.checkAndUpdateLevel(userId, userProfile.totalPoints + points);

        return { success: true, newTotal: userProfile.totalPoints + points };
    }

    async awardBadge(userId: string, badgeId: string) {
        const badge = await this.prisma.badge.findUnique({ where: { id: badgeId } });

        if (!badge) {
            throw new Error('Badge not found');
        }

        const existing = await this.prisma.userBadge.findFirst({
            where: { userId, badgeId },
        });

        if (existing) {
            return { success: false, message: 'Badge already awarded' };
        }

        await this.prisma.userBadge.create({
            data: { userId, badgeId, awardedAt: new Date() },
        });

        return { success: true, badge };
    }

    async getUserStats(userId: string) {
        const profile = await this.prisma.userGamification.findUnique({
            where: { userId },
            include: {
                badges: { include: { badge: true } },
                achievements: true,
            },
        });

        const rank = await this.getUserRank(userId);

        return {
            ...profile,
            rank,
            nextLevelPoints: this.getPointsForLevel(profile?.level + 1 || 2),
        };
    }

    async getLeaderboard(limit: number = 10, category: string = 'overall') {
        const users = await this.prisma.userGamification.findMany({
            take: limit,
            orderBy: { totalPoints: 'desc' },
            include: {
                user: { select: { id: true, name: true, avatar: true } },
            },
        });

        return users.map((u, index) => ({
            rank: index + 1,
            userId: u.user.id,
            name: u.user.name,
            avatar: u.user.avatar,
            points: u.totalPoints,
            level: u.level,
            badges: u.badges?.length || 0,
        }));
    }

    async trackAchievement(userId: string, achievementType: string, metadata?: any) {
        const achievement = await this.prisma.achievementDefinition.findFirst({
            where: { type: achievementType },
        });

        if (!achievement) {
            return { success: false };
        }

        const progress = await this.prisma.userAchievement.upsert({
            where: { userId_achievementId: { userId, achievementId: achievement.id } },
            create: {
                userId,
                achievementId: achievement.id,
                progress: 1,
                completed: 1 >= achievement.requirement,
            },
            update: {
                progress: { increment: 1 },
            },
        });

        if (progress.progress >= achievement.requirement && !progress.completed) {
            await this.prisma.userAchievement.update({
                where: { id: progress.id },
                data: { completed: true, completedAt: new Date() },
            });

            await this.awardPoints(userId, achievement.pointsReward, `Achievement: ${achievement.name}`);
        }

        return { success: true, progress: progress.progress, required: achievement.requirement };
    }

    async getStreak(userId: string) {
        const activities = await this.prisma.userActivity.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
            take: 30,
        });

        let streak = 0;
        let currentDate = new Date();

        for (const activity of activities) {
            const activityDate = new Date(activity.date);
            const daysDiff = Math.floor((currentDate.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24));

            if (daysDiff === streak) {
                streak++;
                currentDate = activityDate;
            } else {
                break;
            }
        }

        return { streak, longestStreak: streak };
    }

    private async checkAndUpdateLevel(userId: string, totalPoints: number) {
        const newLevel = this.calculateLevel(totalPoints);

        await this.prisma.userGamification.update({
            where: { userId },
            data: { level: newLevel },
        });
    }

    private calculateLevel(points: number): number {
        return Math.floor(Math.sqrt(points / 100)) + 1;
    }

    private getPointsForLevel(level: number): number {
        return Math.pow(level - 1, 2) * 100;
    }

    private async getUserRank(userId: string): Promise<number> {
        const userProfile = await this.prisma.userGamification.findUnique({
            where: { userId },
        });

        if (!userProfile) return 0;

        const rank = await this.prisma.userGamification.count({
            where: { totalPoints: { gt: userProfile.totalPoints } },
        });

        return rank + 1;
    }
}
