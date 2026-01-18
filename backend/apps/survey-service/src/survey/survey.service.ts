import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class SurveyService {
    constructor(private readonly prisma: PrismaService) { }

    async createSurvey(title: string, description: string, questions: any[], createdBy: string) {
        return this.prisma.survey.create({
            data: { title, description, questions, createdBy, isActive: true },
        });
    }

    async submitResponse(surveyId: string, userId: string, answers: any[]) {
        return this.prisma.surveyResponse.create({
            data: { surveyId, userId, answers },
        });
    }

    async getSurvey(surveyId: string) {
        return this.prisma.survey.findUnique({ where: { id: surveyId } });
    }

    async getResults(surveyId: string) {
        const responses = await this.prisma.surveyResponse.findMany({
            where: { surveyId },
        });

        return { totalResponses: responses.length, responses };
    }

    async closeSurvey(surveyId: string) {
        return this.prisma.survey.update({
            where: { id: surveyId },
            data: { isActive: false, closedAt: new Date() },
        });
    }
}
