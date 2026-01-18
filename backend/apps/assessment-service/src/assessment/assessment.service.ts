import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class AssessmentService {
    constructor(private readonly prisma: PrismaService) { }

    async createQuiz(courseId: string, title: string, questions: any[], passingScore: number, timeLimit?: number) {
        return this.prisma.quiz.create({
            data: {
                courseId,
                title,
                questions,
                passingScore,
                timeLimit,
                isPublished: false,
            },
        });
    }

    async getQuiz(quizId: string) {
        const quiz = await this.prisma.quiz.findUnique({
            where: { id: quizId },
            include: {
                course: { select: { id: true, title: true } },
                _count: { select: { attempts: true } },
            },
        });

        if (!quiz) {
            throw new NotFoundException('Quiz not found');
        }

        return quiz;
    }

    async publishQuiz(quizId: string) {
        return this.prisma.quiz.update({
            where: { id: quizId },
            data: { isPublished: true, publishedAt: new Date() },
        });
    }

    async submitQuiz(quizId: string, userId: string, answers: any[]) {
        const quiz = await this.getQuiz(quizId);
        const score = this.calculateScore(quiz.questions, answers);
        const passed = score >= quiz.passingScore;

        const attempt = await this.prisma.quizAttempt.create({
            data: {
                quizId,
                userId,
                answers,
                score,
                passed,
                completedAt: new Date(),
            },
        });

        return {
            attemptId: attempt.id,
            score,
            passed,
            passingScore: quiz.passingScore,
            totalQuestions: quiz.questions.length,
        };
    }

    async getUserAttempts(userId: string, quizId?: string) {
        return this.prisma.quizAttempt.findMany({
            where: {
                userId,
                ...(quizId && { quizId }),
            },
            include: {
                quiz: { select: { id: true, title: true, passingScore: true } },
            },
            orderBy: { completedAt: 'desc' },
        });
    }

    async createAssignment(courseId: string, title: string, description: string, dueDate: Date, maxScore: number) {
        return this.prisma.assignment.create({
            data: {
                courseId,
                title,
                description,
                dueDate,
                maxScore,
                isPublished: false,
            },
        });
    }

    async submitAssignment(assignmentId: string, userId: string, content: string, files?: string[]) {
        return this.prisma.assignmentSubmission.create({
            data: {
                assignmentId,
                userId,
                content,
                files,
                submittedAt: new Date(),
                status: 'SUBMITTED',
            },
        });
    }

    async gradeSubmission(submissionId: string, score: number, feedback: string, gradedBy: string) {
        return this.prisma.assignmentSubmission.update({
            where: { id: submissionId },
            data: {
                score,
                feedback,
                gradedBy,
                gradedAt: new Date(),
                status: 'GRADED',
            },
        });
    }

    async getAssignment(assignmentId: string) {
        const assignment = await this.prisma.assignment.findUnique({
            where: { id: assignmentId },
            include: {
                course: { select: { id: true, title: true } },
                _count: { select: { submissions: true } },
            },
        });

        if (!assignment) {
            throw new NotFoundException('Assignment not found');
        }

        return assignment;
    }

    async getSubmissions(assignmentId: string) {
        return this.prisma.assignmentSubmission.findMany({
            where: { assignmentId },
            include: {
                user: { select: { id: true, name: true, email: true } },
            },
            orderBy: { submittedAt: 'desc' },
        });
    }

    private calculateScore(questions: any[], answers: any[]): number {
        let correct = 0;

        questions.forEach((question, index) => {
            const userAnswer = answers[index];
            if (question.correctAnswer === userAnswer?.answer) {
                correct++;
            }
        });

        return (correct / questions.length) * 100;
    }

    async getQuizAnalytics(quizId: string) {
        const attempts = await this.prisma.quizAttempt.findMany({
            where: { quizId },
        });

        const totalAttempts = attempts.length;
        const passedAttempts = attempts.filter(a => a.passed).length;
        const avgScore = attempts.reduce((sum, a) => sum + a.score, 0) / totalAttempts || 0;

        return {
            totalAttempts,
            passedAttempts,
            failedAttempts: totalAttempts - passedAttempts,
            passRate: (passedAttempts / totalAttempts) * 100 || 0,
            avgScore,
        };
    }
}
