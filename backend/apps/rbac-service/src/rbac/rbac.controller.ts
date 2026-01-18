import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RbacService } from './rbac.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';

@ApiTags('RBAC')
@Controller('rbac')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RbacController {
    constructor(private readonly rbacService: RbacService) { }

    @Post('roles')
    @ApiOperation({ summary: 'Create a new role' })
    async createRole(@Body() dto: { name: string; description: string; permissions: string[] }) {
        return this.rbacService.createRole(dto.name, dto.description, dto.permissions);
    }

    @Post('users/:userId/roles/:roleId')
    @ApiOperation({ summary: 'Assign role to user' })
    async assignRole(@Param('userId') userId: string, @Param('roleId') roleId: string) {
        return this.rbacService.assignRoleToUser(userId, roleId);
    }

    @Get('users/:userId/permissions')
    @ApiOperation({ summary: 'Get user permissions' })
    async getUserPermissions(@Param('userId') userId: string) {
        return this.rbacService.getUserPermissions(userId);
    }

    @Post('check')
    @ApiOperation({ summary: 'Check if user has permission' })
    async checkPermission(@Body() dto: { userId: string; resource: string; action: string }) {
        const hasPermission = await this.rbacService.checkPermission(dto.userId, dto.resource, dto.action);
        return { hasPermission };
    }
}
