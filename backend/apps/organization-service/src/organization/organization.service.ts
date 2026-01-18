import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class OrganizationService {
    constructor(private readonly prisma: PrismaService) { }

    async createOrganization(name: string, domain: string, ownerId: string) {
        return this.prisma.organization.create({
            data: {
                name,
                domain,
                ownerId,
                settings: {},
                subscriptionPlan: 'FREE',
            },
        });
    }

    async getOrganization(orgId: string) {
        return this.prisma.organization.findUnique({
            where: { id: orgId },
            include: {
                members: true,
            },
        });
    }

    async addMember(orgId: string, userId: string, role: string) {
        return this.prisma.organizationMember.create({
            data: {
                organizationId: orgId,
                userId,
                role,
            },
        });
    }

    async updateSettings(orgId: string, settings: any) {
        return this.prisma.organization.update({
            where: { id: orgId },
            data: { settings },
        });
    }
}
