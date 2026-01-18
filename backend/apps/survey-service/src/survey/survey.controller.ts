import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SurveyService } from './survey.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Survey')
@Controller('surveys')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SurveyController {
    constructor(private readonly surveyService: SurveyService) { }

    @Post()
    async createSurvey(
        @CurrentUser('sub') userId: string,
        @Body() dto: { title: string; description: string; questions: any[] },
    ) {
        return this.surveyService.createSurvey(dto.title, dto.description, dto.questions, userId);
    }

    @Post(':id/respond')
    async submitResponse(
        @Param('id') surveyId: string,
        @CurrentUser('sub') userId: string,
        @Body() dto: { answers: any[] },
    ) {
        return this.surveyService.submitResponse(surveyId, userId, dto.answers);
    }

    @Get(':id')
    async getSurvey(@Param('id') id: string) {
        return this.surveyService.getSurvey(id);
    }

    @Get(':id/results')
    async getResults(@Param('id') id: string) {
        return this.surveyService.getResults(id);
    }

    @Post(':id/close')
    async closeSurvey(@Param('id') id: string) {
        return this.surveyService.closeSurvey(id);
    }
}
