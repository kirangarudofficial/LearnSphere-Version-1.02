import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DocumentService } from './document.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Document Management')
@Controller('documents')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DocumentController {
    constructor(private readonly documentService: DocumentService) { }

    @Post('upload')
    async uploadDocument(
        @CurrentUser('sub') userId: string,
        @Body() dto: {
            courseId: string;
            fileName: string;
            fileType: string;
            fileSize: number;
        },
    ) {
        return this.documentService.uploadDocument(
            dto.courseId,
            dto.fileName,
            dto.fileType,
            dto.fileSize,
            userId,
        );
    }

    @Get(':id')
    async getDocument(@Param('id') id: string) {
        return this.documentService.getDocument(id);
    }

    @Get('course/:courseId')
    async listDocuments(@Param('courseId') courseId: string) {
        return this.documentService.listDocuments(courseId);
    }

    @Delete(':id')
    async deleteDocument(@Param('id') id: string, @CurrentUser('sub') userId: string) {
        return this.documentService.deleteDocument(id, userId);
    }

    @Patch(':id')
    async updateMetadata(@Param('id') id: string, @Body() metadata: any) {
        return this.documentService.updateMetadata(id, metadata);
    }

    @Post(':id/version')
    async createNewVersion(
        @Param('id') id: string,
        @CurrentUser('sub') userId: string,
        @Body() dto: { fileName: string },
    ) {
        return this.documentService.createNewVersion(id, dto.fileName, userId);
    }
}
