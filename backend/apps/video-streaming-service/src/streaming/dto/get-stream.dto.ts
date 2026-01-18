import { IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetStreamDto {
    @ApiPropertyOptional({ enum: ['hls', 'dash'], description: 'Streaming format' })
    @IsOptional()
    @IsEnum(['hls', 'dash'])
    format?: 'hls' | 'dash';

    @ApiPropertyOptional({ enum: ['360p', '720p', '1080p'], description: 'Video quality' })
    @IsOptional()
    @IsEnum(['360p', '720p', '1080p'])
    quality?: string;
}
