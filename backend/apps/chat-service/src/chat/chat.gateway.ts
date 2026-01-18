import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private readonly logger = new Logger(ChatGateway.name);

    constructor(private readonly chatService: ChatService) { }

    async handleConnection(client: Socket) {
        const userId = client.handshake.query.userId as string;
        this.logger.log(`Client connected: ${userId}`);

        // Join user to their conversation rooms
        const conversations = await this.chatService.getUserConversations(userId);
        conversations.forEach((conv) => {
            client.join(`conversation:${conv.id}`);
        });

        // Notify online status
        client.broadcast.emit('userOnline', { userId });
    }

    handleDisconnect(client: Socket) {
        const userId = client.handshake.query.userId as string;
        this.logger.log(`Client disconnected: ${userId}`);

        // Notify offline status
        client.broadcast.emit('userOffline', { userId });
    }

    @SubscribeMessage('sendMessage')
    async handleSendMessage(
        @MessageBody() dto: SendMessageDto,
        @ConnectedSocket() client: Socket,
    ) {
        const message = await this.chatService.sendMessage(dto);

        // Broadcast to all participants in conversation
        this.server
            .to(`conversation:${dto.conversationId}`)
            .emit('newMessage', message);

        return message;
    }

    @SubscribeMessage('typing')
    handleTyping(
        @MessageBody() data: { conversationId: string; userId: string },
        @ConnectedSocket() client: Socket,
    ) {
        client.to(`conversation:${data.conversationId}`).emit('userTyping', {
            userId: data.userId,
            conversationId: data.conversationId,
        });
    }

    @SubscribeMessage('stopTyping')
    handleStopTyping(
        @MessageBody() data: { conversationId: string; userId: string },
        @ConnectedSocket() client: Socket,
    ) {
        client.to(`conversation:${data.conversationId}`).emit('userStoppedTyping', {
            userId: data.userId,
            conversationId: data.conversationId,
        });
    }

    @SubscribeMessage('markAsRead')
    async handleMarkAsRead(
        @MessageBody() data: { conversationId: string; userId: string },
    ) {
        await this.chatService.markAsRead(data.conversationId, data.userId);

        this.server
            .to(`conversation:${data.conversationId}`)
            .emit('messagesRead', {
                userId: data.userId,
                conversationId: data.conversationId,
            });
    }
}
