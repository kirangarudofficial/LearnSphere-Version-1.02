import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddItemDto } from './dto/add-item.dto';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Shopping Cart')
@Controller('cart')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    @ApiOperation({ summary: 'Get user cart' })
    async getCart(@CurrentUser('sub') userId: string) {
        return this.cartService.getCart(userId);
    }

    @Post('items')
    @ApiOperation({ summary: 'Add item to cart' })
    async addItem(@Body() dto: AddItemDto, @CurrentUser('sub') userId: string) {
        return this.cartService.addItem(userId, dto.courseId, dto.price);
    }

    @Delete('items/:courseId')
    @ApiOperation({ summary: 'Remove item from cart' })
    async removeItem(@Param('courseId') courseId: string, @CurrentUser('sub') userId: string) {
        return this.cartService.removeItem(userId, courseId);
    }

    @Delete()
    @ApiOperation({ summary: 'Clear cart' })
    async clearCart(@CurrentUser('sub') userId: string) {
        return this.cartService.clearCart(userId);
    }

    @Get('total')
    @ApiOperation({ summary: 'Get cart total' })
    async getTotal(@CurrentUser('sub') userId: string) {
        return this.cartService.getTotal(userId);
    }
}
