import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AssignmentService } from './assignment.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';

@ApiTags('Assignment')
@Controller('assignments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AssignmentController {
    constructor(private readonly assignmentService: AssignmentService) { }

    @Post()
    async create(@Body() dto: { lessonId: string; title: string; instructions: string; dueDate: string }) {
        return this.assignmentService.createAssignment(dto.lessonId, dto.title, dto.instructions, new Date(dto.dueDate));
    }

    @Post(':id/submit')
    async submit(@Param('id') id: string, @Body() dto: { studentId: string; fileUrl: string }) {
        return this.assignmentService.submitAssignment(id, dto.studentId, dto.fileUrl);
    }

    @Patch('submissions/:id/grade')
    async grade(@Param('id') id: string, @Body() dto: { grade: number; feedback: string }) {
        return this.assignmentService.gradeSubmission(id, dto.grade, dto.feedback);
    }

    @Get(':id/submissions')
    async getSubmissions(@Param('id') id: string) {
        return this.assignmentService.getSubmissions(id);
    }
}
