import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FeatureFlagService } from './feature-flag.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';

@ApiTags('Feature Flags')
@Controller('flags')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FeatureFlagController {
    constructor(private readonly featureFlagService: FeatureFlagService) { }

    @Post()
    async createFlag(@Body() dto: {
        key: string;
        name: string;
        description: string;
        defaultValue: boolean;
    }) {
        return this.featureFlagService.createFlag(
            dto.key,
            dto.name,
            dto.description,
            dto.defaultValue,
        );
    }

    @Get(':key/evaluate')
    async evaluateFlag(
        @Param('key') key: string,
        @Query('userId') userId?: string,
        @Query('organizationId') organizationId?: string,
    ) {
        return this.featureFlagService.evaluateFlag(key, userId, organizationId);
    }

    @Patch(':key')
    async updateFlag(@Param('key') key: string, @Body() updates: any) {
        return this.featureFlagService.updateFlag(key, updates);
    }

    @Post(':key/toggle')
    async toggleFlag(@Param('key') key: string) {
        return this.featureFlagService.toggleFlag(key);
    }

    @Get()
    async listFlags() {
        return this.featureFlagService.listFlags();
    }

    @Post(':key/rollout')
    async setRollout(@Param('key') key: string, @Body() dto: { percentage: number }) {
        return this.featureFlagService.setRolloutPercentage(key, dto.percentage);
    }

    @Post(':key/override')
    async addOverride(
        @Param('key') key: string,
        @Body() dto: {
            isEnabled: boolean;
            userId?: string;
            organizationId?: string;
            variant?: string;
        },
    ) {
        return this.featureFlagService.addOverride(
            key,
            dto.isEnabled,
            dto.userId,
            dto.organizationId,
            dto.variant,
        );
    }
}
