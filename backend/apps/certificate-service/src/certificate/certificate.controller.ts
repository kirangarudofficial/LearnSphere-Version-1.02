import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CertificateService } from './certificate.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Certificate')
@Controller('certificates')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CertificateController {
    constructor(private readonly certificateService: CertificateService) { }

    @Post('generate')
    async generateCertificate(
        @CurrentUser('sub') userId: string,
        @Body() dto: { courseId: string },
    ) {
        return this.certificateService.generateCertificate(userId, dto.courseId);
    }

    @Get('verify/:id')
    async verifyCertificate(@Param('id') certificateId: string) {
        return this.certificateService.verifyCertificate(certificateId);
    }

    @Get('my-certificates')
    async getUserCertificates(@CurrentUser('sub') userId: string) {
        return this.certificateService.getUserCertificates(userId);
    }

    @Get(':id')
    async getCertificate(@Param('id') certificateId: string) {
        return this.certificateService.getCertificate(certificateId);
    }

    @Get(':id/download')
    async downloadCertificate(@Param('id') certificateId: string) {
        return this.certificateService.downloadCertificate(certificateId);
    }

    @Post(':id/revoke')
    async revokeCertificate(@Param('id') certificateId: string, @Body() dto: { reason: string }) {
        return this.certificateService.revokeCertificate(certificateId, dto.reason);
    }
}
