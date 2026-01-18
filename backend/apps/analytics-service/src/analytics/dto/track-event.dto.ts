import { IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TrackEventDto {
    @ApiProperty({ description: 'User ID' })
    @IsString()
    userId: string;

    @ApiProperty({ description: 'Event type (e.g., page_view, video_watch)' })
    @IsString()
    eventType: string;

    @ApiProperty({ description: 'Event data (JSON)' })
    @IsObject()
    eventData: any;

    @ApiPropertyOptional({ description: 'Session ID' })
    @IsOptional()
    @IsString()
    sessionId?: string;
}
