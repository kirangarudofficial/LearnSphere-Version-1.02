import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { RolesGuard } from '@shared/auth/roles.guard';
import { Roles } from '@shared/auth/roles.decorator';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'super_admin')
@ApiBearerAuth()
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('stats')
    async getSystemStats() {
        return this.adminService.getSystemStats();
    }

    @Get('users')
    async getUsers(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
        @Query('role') role?: string,
    ) {
        const filters = role ? { role } : undefined;
        return this.adminService.getUsers(page, limit, filters);
    }

    @Patch('users/:id/role')
    async updateUserRole(@Param('id') userId: string, @Body() dto: { role: string }) {
        return this.adminService.updateUserRole(userId, dto.role);
    }

    @Post('users/:id/ban')
    async banUser(@Param('id') userId: string, @Body() dto: { reason: string }) {
        return this.adminService.banUser(userId, dto.reason);
    }

    @Post('users/:id/unban')
    async unbanUser(@Param('id') userId: string) {
        return this.adminService.unbanUser(userId);
    }

    @Get('courses')
    async getCourses(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
        @Query('status') status?: string,
    ) {
        const filters = status ? { status } : undefined;
        return this.adminService.getCourses(page, limit, filters);
    }

    @Post('courses/:id/approve')
    async approveCourse(@Param('id') courseId: string) {
        return this.adminService.approveCourse(courseId);
    }

    @Post('courses/:id/reject')
    async rejectCourse(@Param('id') courseId: string, @Body() dto: { reason: string }) {
        return this.adminService.rejectCourse(courseId, dto.reason);
    }

    @Get('revenue')
    async getRevenueReport(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ) {
        return this.adminService.getRevenueReport(new Date(startDate), new Date(endDate));
    }

    @Get('activity-logs')
    async getActivityLogs(@Query('page') page?: number, @Query('limit') limit?: number) {
        return this.adminService.getActivityLogs(page, limit);
    }

    @Get('health')
    async getSystemHealth() {
        return this.adminService.getSystemHealth();
    }
}
