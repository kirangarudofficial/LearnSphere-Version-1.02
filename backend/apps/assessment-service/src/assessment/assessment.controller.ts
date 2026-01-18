import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AssessmentService } from './assessment.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Assessment')
@Controller('assessments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AssessmentController {
    constructor(private readonly assessmentService: AssessmentService) { }

    @Post('quizzes')
    async createQuiz(@Body() dto: {
        courseId: string;
        title: string;
        questions: any[];
        passingScore: number;
        timeLimit?: number;
    }) {
        return this.assessmentService.createQuiz(
            dto.courseId,
            dto.title,
            dto.questions,
            dto.passingScore,
            dto.timeLimit,
        );
    }

    @Get('quizzes/:id')
    async getQuiz(@Param('id') id: string) {
        return this.assessmentService.getQuiz(id);
    }

    @Post('quizzes/:id/publish')
    async publishQuiz(@Param('id') id: string) {
        return this.assessmentService.publishQuiz(id);
    }

    @Post('quizzes/:id/submit')
    async submitQuiz(
        @Param('id') quizId: string,
        @CurrentUser('sub') userId: string,
        @Body() dto: { answers: any[] },
    ) {
        return this.assessmentService.submitQuiz(quizId, userId, dto.answers);
    }

    @Get('quizzes/:id/analytics')
    async getQuizAnalytics(@Param('id') quizId: string) {
        return this.assessmentService.getQuizAnalytics(quizId);
    }

    @Get('my-attempts')
    async getUserAttempts(@CurrentUser('sub') userId: string) {
        return this.assessmentService.getUserAttempts(userId);
    }

    @Post('assignments')
    async createAssignment(@Body() dto: {
        courseId: string;
        title: string;
        description: string;
        dueDate: Date;
        maxScore: number;
    }) {
        return this.assessmentService.createAssignment(
            dto.courseId,
            dto.title,
            dto.description,
            new Date(dto.dueDate),
            dto.maxScore,
        );
    }

    @Get('assignments/:id')
    async getAssignment(@Param('id') id: string) {
        return this.assessmentService.getAssignment(id);
    }

    @Post('assignments/:id/submit')
    async submitAssignment(
        @Param('id') assignmentId: string,
        @CurrentUser('sub') userId: string,
        @Body() dto: { content: string; files?: string[] },
    ) {
        return this.assessmentService.submitAssignment(assignmentId, userId, dto.content, dto.files);
    }

    @Get('assignments/:id/submissions')
    async getSubmissions(@Param('id') assignmentId: string) {
        return this.assessmentService.getSubmissions(assignmentId);
    }

    @Patch('submissions/:id/grade')
    async gradeSubmission(
        @Param('id') submissionId: string,
        @CurrentUser('sub') userId: string,
        @Body() dto: { score: number; feedback: string },
    ) {
        return this.assessmentService.gradeSubmission(submissionId, dto.score, dto.feedback, userId);
    }
}
