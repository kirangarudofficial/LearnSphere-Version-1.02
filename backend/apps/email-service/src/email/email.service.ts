import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) { }

    async sendEmail(to: string, subject: string, body: string, from?: string) {
        const email = await this.prisma.email.create({
            data: {
                to,
                subject,
                body,
                from: from || process.env.DEFAULT_FROM_EMAIL,
                status: 'PENDING',
            },
        });

        try {
            await this.sendViaProvider(email);

            await this.prisma.email.update({
                where: { id: email.id },
                data: {
                    status: 'SENT',
                    sentAt: new Date(),
                },
            });

            return { success: true, emailId: email.id };
        } catch (error) {
            await this.prisma.email.update({
                where: { id: email.id },
                data: {
                    status: 'FAILED',
                    error: error.message,
                },
            });

            throw error;
        }
    }

    async sendTemplateEmail(to: string, templateId: string, data: any) {
        const template = await this.prisma.emailTemplate.findUnique({
            where: { id: templateId },
        });

        if (!template) {
            throw new Error('Template not found');
        }

        const subject = this.renderTemplate(template.subject, data);
        const body = this.renderTemplate(template.body, data);

        return this.sendEmail(to, subject, body);
    }

    async sendBulkEmail(recipients: string[], subject: string, body: string) {
        const results = [];

        for (const recipient of recipients) {
            try {
                const result = await this.sendEmail(recipient, subject, body);
                results.push({ email: recipient, ...result });
            } catch (error) {
                results.push({ email: recipient, success: false, error: error.message });
            }
        }

        return { totalSent: results.filter(r => r.success).length, results };
    }

    async getEmailStatus(emailId: string) {
        return this.prisma.email.findUnique({
            where: { id: emailId },
        });
    }

    async createTemplate(name: string, subject: string, body: string) {
        return this.prisma.emailTemplate.create({
            data: { name, subject, body },
        });
    }

    async getTemplates() {
        return this.prisma.emailTemplate.findMany();
    }

    private async sendViaProvider(email: any) {
        // Integration with SendGrid, AWS SES, or other email provider
        this.logger.log(`Sending email to ${email.to}: ${email.subject}`);

        // Mock email sending - replace with actual provider
        return Promise.resolve();
    }

    private renderTemplate(template: string, data: any): string {
        let rendered = template;

        Object.keys(data).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            rendered = rendered.replace(regex, data[key]);
        });

        return rendered;
    }
}
