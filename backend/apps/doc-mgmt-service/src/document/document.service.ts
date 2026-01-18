import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class DocumentService {
    private readonly ALLOWED_TYPES = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt'];
    private readonly MAX_SIZE = 50 * 1024 * 1024; // 50MB

    constructor(private readonly prisma: PrismaService) { }

    async uploadDocument(
        courseId: string,
        fileName: string,
        fileType: string,
        fileSize: number,
        uploadedBy: string,
    ) {
        // Validate file type
        if (!this.ALLOWED_TYPES.includes(fileType.toLowerCase())) {
            throw new BadRequestException(`File type ${fileType} is not allowed`);
        }

        // Validate file size
        if (fileSize > this.MAX_SIZE) {
            throw new BadRequestException('File size exceeds maximum allowed size');
        }

        // Create document record
        const document = await this.prisma.document.create({
            data: {
                courseId,
                fileName,
                fileType,
                fileSize,
                uploadedBy,
                version: 1,
                url: `s3://bucket/documents/${courseId}/${fileName}`, // Mock S3 URL
                status: 'ACTIVE',
            },
        });

        return document;
    }

    async getDocument(documentId: string) {
        const document = await this.prisma.document.findUnique({
            where: { id: documentId },
        });

        if (!document) {
            throw new NotFoundException('Document not found');
        }

        // Generate presigned URL for download
        const downloadUrl = await this.generateDownloadUrl(document.url);

        return { ...document, downloadUrl };
    }

    async listDocuments(courseId: string) {
        return this.prisma.document.findMany({
            where: { courseId, status: 'ACTIVE' },
            orderBy: { uploadedAt: 'desc' },
        });
    }

    async deleteDocument(documentId: string, userId: string) {
        const document = await this.prisma.document.findUnique({
            where: { id: documentId },
        });

        if (!document) {
            throw new NotFoundException('Document not found');
        }

        // Soft delete
        await this.prisma.document.update({
            where: { id: documentId },
            data: {
                status: 'DELETED',
                deletedAt: new Date(),
                deletedBy: userId,
            },
        });

        return { success: true };
    }

    async updateMetadata(documentId: string, metadata: any) {
        return this.prisma.document.update({
            where: { id: documentId },
            data: {
                title: metadata.title,
                description: metadata.description,
                tags: metadata.tags,
            },
        });
    }

    async createNewVersion(documentId: string, fileName: string, uploadedBy: string) {
        const originalDoc = await this.prisma.document.findUnique({
            where: { id: documentId },
        });

        if (!originalDoc) {
            throw new NotFoundException('Original document not found');
        }

        const newVersion = await this.prisma.document.create({
            data: {
                courseId: originalDoc.courseId,
                fileName,
                fileType: originalDoc.fileType,
                fileSize: originalDoc.fileSize,
                uploadedBy,
                version: originalDoc.version + 1,
                parentId: documentId,
                url: `s3://bucket/documents/${originalDoc.courseId}/${fileName}`,
                status: 'ACTIVE',
            },
        });

        return newVersion;
    }

    private async generateDownloadUrl(s3Url: string): Promise<string> {
        // Generate presigned S3 URL (mock)
        return `${s3Url}?presigned=true&expires=3600`;
    }
}
