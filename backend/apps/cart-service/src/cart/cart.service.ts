import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) { }

    async getCart(userId: string) {
        let cart = await this.prisma.shoppingCart.findUnique({
            where: { userId },
            include: { items: true },
        });

        if (!cart) {
            cart = await this.prisma.shoppingCart.create({
                data: { userId },
                include: { items: true },
            });
        }

        return cart;
    }

    async addItem(userId: string, courseId: string, price: number) {
        const cart = await this.getCart(userId);

        const item = await this.prisma.cartItem.upsert({
            where: {
                cartId_courseId: { cartId: cart.id, courseId },
            },
            update: { price },
            create: { cartId: cart.id, courseId, price },
        });

        return item;
    }

    async removeItem(userId: string, courseId: string) {
        const cart = await this.getCart(userId);

        await this.prisma.cartItem.deleteMany({
            where: { cartId: cart.id, courseId },
        });

        return { success: true };
    }

    async clearCart(userId: string) {
        const cart = await this.getCart(userId);
        await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
        return { success: true };
    }

    async getTotal(userId: string) {
        const cart = await this.getCart(userId);

        const total = await this.prisma.cartItem.aggregate({
            where: { cartId: cart.id },
            _sum: { price: true },
            _count: true,
        });

        return {
            subtotal: total._sum.price || 0,
            itemCount: total._count,
            total: total._sum.price || 0,
        };
    }
}
