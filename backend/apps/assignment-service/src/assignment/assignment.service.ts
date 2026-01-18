import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class AssignmentService {
    constructor(private readonly prisma: PrismaService) { }

    async createAssignment(lessonId: string, title: string, instructions: string, dueDate: Date) {
        return this.prisma.assignment.create({
            data: { lessonId, title, instructions, dueDate, maxPoints: 100 },
        });
    }

    async submitAssignment(assignmentId: string, studentId: string, fileUrl: string) {
        return this.prisma.assignmentSubmission.create({
            data: {
                assignmentId,
                studentId,
                fileUrl,
                submittedAt: new Date(),
                status: 'SUBMITTED',
            },
        });
    }

    async gradeSubmission(submissionId: string, grade: number, feedback: string) {
        return this.prisma.assignmentSubmission.update({
            where: { id: submissionId },
            data: {
                grade,
                feedback,
                gradedAt: new Date(),
                status: 'GRADED',
            },
        });
    }

    async getSubmissions(assignmentId: string) {
        return this.prisma.assignmentSubmission.findMany({
            where: { assignmentId },
            include: { student: true },
        });
    }
}
