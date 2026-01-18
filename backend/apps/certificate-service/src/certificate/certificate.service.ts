import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class CertificateService {
    constructor(private readonly prisma: PrismaService) { }

    async generateCertificate(userId: string, courseId: string) {
        // Verify enrollment completion
        const enrollment = await this.prisma.enrollment.findFirst({
            where: { userId, courseId },
            include: { course: true, user: true },
        });

        if (!enrollment) {
            throw new BadRequestException('Enrollment not found');
        }

        if (enrollment.progress < 100) {
            throw new BadRequestException('Course not yet completed');
        }

        // Check if certificate already exists
        const existing = await this.prisma.certificate.findFirst({
            where: { userId, courseId },
        });

        if (existing) {
            return existing;
        }

        // Generate unique certificate ID
        const certificateId = this.generateCertificateId();

        const certificate = await this.prisma.certificate.create({
            data: {
                userId,
                courseId,
                certificateId,
                completionDate: new Date(),
                verificationUrl: `https://platform.com/verify/${certificateId}`,
            },
        });

        // Generate PDF (mock - implement actual PDF generation)
        const pdfUrl = await this.generateCertificatePDF(certificate, enrollment);

        return this.prisma.certificate.update({
            where: { id: certificate.id },
            data: { pdfUrl },
        });
    }

    async getCertificate(certificateId: string) {
        return this.prisma.certificate.findUnique({
            where: { certificateId },
            include: {
                user: { select: { id: true, name: true, email: true } },
                course: { select: { id: true, title: true } },
            },
        });
    }

    async getUserCertificates(userId: string) {
        return this.prisma.certificate.findMany({
            where: { userId },
            include: {
                course: { select: { id: true, title: true, instructor: { select: { name: true } } } },
            },
            orderBy: { completionDate: 'desc' },
        });
    }

    async verifyCertificate(certificateId: string) {
        const certificate = await this.getCertificate(certificateId);

        if (!certificate) {
            return { valid: false, message: 'Certificate not found' };
        }

        return {
            valid: true,
            certificateId: certificate.certificateId,
            userName: certificate.user.name,
            courseName: certificate.course.title,
            completionDate: certificate.completionDate,
        };
    }

    async downloadCertificate(certificateId: string) {
        const certificate = await this.getCertificate(certificateId);

        if (!certificate) {
            throw new BadRequestException('Certificate not found');
        }

        return { downloadUrl: certificate.pdfUrl };
    }

    async revokeCertificate(certificateId: string, reason: string) {
        return this.prisma.certificate.update({
            where: { certificateId },
            data: {
                isRevoked: true,
                revocationReason: reason,
                revokedAt: new Date(),
            },
        });
    }

    private generateCertificateId(): string {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 8);
        return `CERT-${timestamp}-${random}`.toUpperCase();
    }

    private async generateCertificatePDF(certificate: any, enrollment: any): Promise<string> {
        // Mock PDF generation - implement actual PDF generation with library like puppeteer or pdfkit
        return `s3://certificates/${certificate.certificateId}.pdf`;
    }
}
