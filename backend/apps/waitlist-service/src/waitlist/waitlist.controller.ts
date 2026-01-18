import { Controller, Post, Get, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { WaitlistService } from './waitlist.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Waitlist')
@Controller('waitlist')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WaitlistController {
    constructor(private readonly waitlistService: WaitlistService) { }

    @Post('join')
    async joinWaitlist(
        @CurrentUser('sub') userId: string,
        @Body() dto: { courseId: string; email: string },
    ) {
        return this.waitlistService.joinWaitlist(dto.courseId, dto.email, userId);
    }

    @Post('course/:id/notify')
    async notifyAvailable(@Param('id') courseId: string, @Body() dto: { count: number }) {
        return this.waitlistService.notifyAvailable(courseId, dto.count);
    }

    @Get('entry/:id/position')
    async getPosition(@Param('id') id: string) {
        return this.waitlistService.getPosition(id);
    }

    @Delete('entry/:id')
    async removeFromWaitlist(@Param('id') id: string) {
        return this.waitlistService.removeFromWaitlist(id);
    }
}
