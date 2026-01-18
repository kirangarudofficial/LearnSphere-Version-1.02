import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TranslationService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) { }

    async translateText(text: string, targetLang: string, sourceLang?: string) {
        const translated = await this.callTranslationAPI(text, targetLang, sourceLang);

        await this.prisma.translation.create({
            data: { original: text, translated, sourceLang, targetLang },
        });

        return { translated, sourceLang, targetLang };
    }

    async translateCourse(courseId: string, targetLang: string) {
        const course = await this.prisma.course.findUnique({ where: { id: courseId } });
        const title = await this.translateText(course.title, targetLang);
        const description = await this.translateText(course.description, targetLang);

        return { title: title.translated, description: description.translated };
    }

    async getSupportedLanguages() {
        return ['en', 'es', 'fr', 'de', 'ja', 'zh', 'ar', 'hi', 'pt', 'ru'];
    }

    private async callTranslationAPI(text: string, targetLang: string, sourceLang?: string): Promise<string> {
        // Integration with Google Translate or DeepL
        return `${text} (translated to ${targetLang})`;
    }
}
