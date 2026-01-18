import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class RbacService {
    constructor(private readonly prisma: PrismaService) { }

    async createRole(name: string, description: string, permissions: string[]) {
        return this.prisma.role.create({
            data: {
                name,
                description,
                permissions: {
                    connect: permissions.map((id) => ({ id })),
                },
            },
            include: { permissions: true },
        });
    }

    async assignRoleToUser(userId: string, roleId: string) {
        return this.prisma.userRole.create({
            data: { userId, roleId },
        });
    }

    async checkPermission(userId: string, resource: string, action: string): Promise<boolean> {
        const userRoles = await this.prisma.userRole.findMany({
            where: { userId },
            include: {
                role: {
                    include: { permissions: true },
                },
            },
        });

        for (const userRole of userRoles) {
            const hasPermission = userRole.role.permissions.some(
                (p) => p.resource === resource && p.action === action,
            );
            if (hasPermission) return true;
        }

        return false;
    }

    async getUserPermissions(userId: string) {
        const userRoles = await this.prisma.userRole.findMany({
            where: { userId },
            include: {
                role: {
                    include: { permissions: true },
                },
            },
        });

        const permissions = userRoles.flatMap((ur) => ur.role.permissions);
        return permissions;
    }
}
