import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('AI Platform')
@Controller('ai')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AiController {
    constructor(private readonly aiService: AiService) { }

    @Post('chat')
    async chatbot(
        @CurrentUser('sub') userId: string,
        @Body() dto: { message: string; courseId?: string },
    ) {
        return this.aiService.chatbot(userId, dto.message, dto.courseId);
    }

    @Post('generate')
    async generateContent(@Body() dto: { type: string; context: any }) {
        return this.aiService.generateContent(dto.type, dto.context);
    }

    @Post('grade')
    async autoGrade(@Body() dto: { submissionId: string; rubric: any }) {
        return this.aiService.autoGrade(dto.submissionId, dto.rubric);
    }

    @Post('analyze-sentiment')
    async analyzeSentiment(@Body() dto: { text: string }) {
        return this.aiService.analyzeSentiment(dto.text);
    }

    @Get('learning-path/:userId')
    async personalizeLearningPath(@Param('userId') userId: string) {
        return this.aiService.personalizeLearningPath(userId);
    }
}
