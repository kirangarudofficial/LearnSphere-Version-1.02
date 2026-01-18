import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { IntegrationService } from './integration.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Integration')
@Controller('integrations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class IntegrationController {
    constructor(private readonly integrationService: IntegrationService) { }

    @Post('connect')
    async connectIntegration(
        @CurrentUser('sub') userId: string,
        @Body() dto: { provider: string; credentials: any },
    ) {
        return this.integrationService.connectIntegration(dto.provider, dto.credentials, userId);
    }

    @Delete(':id/disconnect')
    async disconnectIntegration(@Param('id') id: string) {
        return this.integrationService.disconnectIntegration(id);
    }

    @Post(':id/sync')
    async syncData(@Param('id') id: string) {
        return this.integrationService.syncData(id);
    }

    @Get()
    async getUserIntegrations(@CurrentUser('sub') userId: string) {
        return this.integrationService.getUserIntegrations(userId);
    }

    @Post(':id/execute')
    async executeAction(
        @Param('id') id: string,
        @Body() dto: { action: string; params: any },
    ) {
        return this.integrationService.executeAction(id, dto.action, dto.params);
    }
}
