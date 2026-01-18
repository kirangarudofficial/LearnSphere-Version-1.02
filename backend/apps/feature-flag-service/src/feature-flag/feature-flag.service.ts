import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class FeatureFlagService {
    constructor(private readonly prisma: PrismaService) { }

    async createFlag(key: string, name: string, description: string, defaultValue: boolean) {
        return this.prisma.featureFlag.create({
            data: {
                key,
                name,
                description,
                defaultValue,
                isEnabled: defaultValue,
                rolloutPercentage: 0,
            },
        });
    }

    async evaluateFlag(key: string, userId?: string, organizationId?: string) {
        const flag = await this.prisma.featureFlag.findUnique({
            where: { key },
        });

        if (!flag) {
            return { enabled: false, reason: 'flag-not-found' };
        }

        if (!flag.isEnabled) {
            return { enabled: false, reason: 'flag-disabled' };
        }

        // Check user-specific overrides
        if (userId) {
            const override = await this.prisma.featureFlagOverride.findFirst({
                where: { flagKey: key, userId },
            });

            if (override) {
                return { enabled: override.isEnabled, reason: 'user-override', variant: override.variant };
            }
        }

        // Check organization overrides
        if (organizationId) {
            const override = await this.prisma.featureFlagOverride.findFirst({
                where: { flagKey: key, organizationId },
            });

            if (override) {
                return { enabled: override.isEnabled, reason: 'org-override', variant: override.variant };
            }
        }

        // Percentage-based rollout
        if (flag.rolloutPercentage < 100) {
            const hash = this.hashString(userId || organizationId || 'anonymous');
            const userPercentage = hash % 100;

            if (userPercentage >= flag.rolloutPercentage) {
                return { enabled: false, reason: 'rollout-percentage' };
            }
        }

        return { enabled: true, reason: 'default', variant: flag.defaultVariant };
    }

    async updateFlag(key: string, updates: any) {
        return this.prisma.featureFlag.update({
            where: { key },
            data: {
                ...updates,
                updatedAt: new Date(),
            },
        });
    }

    async toggleFlag(key: string) {
        const flag = await this.prisma.featureFlag.findUnique({
            where: { key },
        });

        return this.prisma.featureFlag.update({
            where: { key },
            data: { isEnabled: !flag.isEnabled },
        });
    }

    async listFlags() {
        return this.prisma.featureFlag.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async setRolloutPercentage(key: string, percentage: number) {
        if (percentage < 0 || percentage > 100) {
            throw new Error('Percentage must be between 0 and 100');
        }

        return this.prisma.featureFlag.update({
            where: { key },
            data: { rolloutPercentage: percentage },
        });
    }

    async addOverride(
        flagKey: string,
        isEnabled: boolean,
        userId?: string,
        organizationId?: string,
        variant?: string,
    ) {
        return this.prisma.featureFlagOverride.create({
            data: {
                flagKey,
                userId,
                organizationId,
                isEnabled,
                variant,
            },
        });
    }

    private hashString(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }
}
