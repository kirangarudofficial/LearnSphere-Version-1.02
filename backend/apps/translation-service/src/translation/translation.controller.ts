import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TranslationService } from './translation.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';

@ApiTags('Translation')
@Controller('translation')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TranslationController {
    constructor(private readonly translationService: TranslationService) { }

    @Post('translate')
    async translateText(@Body() dto: { text: string; targetLang: string; sourceLang?: string }) {
        return this.translationService.translateText(dto.text, dto.targetLang, dto.sourceLang);
    }

    @Post('course/:id')
    async translateCourse(@Param('id') courseId: string, @Body() dto: { targetLang: string }) {
        return this.translationService.translateCourse(courseId, dto.targetLang);
    }

    @Get('languages')
    async getSupportedLanguages() {
        return this.translationService.getSupportedLanguages();
    }
}
