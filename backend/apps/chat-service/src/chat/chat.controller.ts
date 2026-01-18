import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags('Chat')
@Controller('chat')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Post('conversations')
    @ApiOperation({ summary: 'Create a new conversation' })
    async createConversation(
        @Body() dto: CreateConversationDto,
        @CurrentUser('sub') userId: string,
    ) {
        return this.chatService.createConversation(dto, userId);
    }

    @Get('conversations')
    @ApiOperation({ summary: 'Get user conversations' })
    async getUserConversations(@CurrentUser('sub') userId: string) {
        return this.chatService.getUserConversations(userId);
    }

    @Get('conversations/:conversationId/messages')
    @ApiOperation({ summary: 'Get conversation messages' })
    async getMessages(
        @Param('conversationId') conversationId: string,
        @Query('limit') limit?: number,
        @Query('offset') offset?: number,
    ) {
        return this.chatService.getMessages(conversationId, limit, offset);
    }

    @Delete('messages/:messageId')
    @ApiOperation({ summary: 'Delete a message' })
    async deleteMessage(
        @Param('messageId') messageId: string,
        @CurrentUser('sub') userId: string,
    ) {
        return this.chatService.deleteMessage(messageId, userId);
    }
}
