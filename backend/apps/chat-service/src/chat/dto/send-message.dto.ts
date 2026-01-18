import { IsString, IsArray, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SendMessageDto {
    @ApiProperty()
    @IsString()
    conversationId: string;

    @ApiProperty()
    @IsString()
    senderId: string;

    @ApiProperty()
    @IsString()
    content: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    attachments?: any[];
}

export class CreateConversationDto {
    @ApiProperty({ enum: ['DIRECT', 'GROUP', 'COURSE'] })
    @IsEnum(['DIRECT', 'GROUP', 'COURSE'])
    type: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    courseId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsArray()
    participantIds: string[];
}
