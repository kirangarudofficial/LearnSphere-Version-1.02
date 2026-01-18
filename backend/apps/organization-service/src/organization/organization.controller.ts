import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { OrganizationService } from './organization.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';

@ApiTags('Organization')
@Controller('organizations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) { }

    @Post()
    async create(@Body() dto: { name: string; domain: string; ownerId: string }) {
        return this.organizationService.createOrganization(dto.name, dto.domain, dto.ownerId);
    }

    @Get(':orgId')
    async getOrganization(@Param('orgId') orgId: string) {
        return this.organizationService.getOrganization(orgId);
    }

    @Post(':orgId/members')
    async addMember(@Param('orgId') orgId: string, @Body() dto: { userId: string; role: string }) {
        return this.organizationService.addMember(orgId, dto.userId, dto.role);
    }
}
