import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProgressDto {
    @ApiProperty({ description: 'Current playback time in seconds' })
    @IsInt()
    @Min(0)
    currentTime: number;

    @ApiProperty({ description: 'Total video duration in seconds' })
    @IsInt()
    @Min(1)
    duration: number;
}
