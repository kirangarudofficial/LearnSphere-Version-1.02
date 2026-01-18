import { IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProcessingJobDto {
    @ApiProperty({ description: 'Lesson ID' })
    @IsString()
    lessonId: string;

    @ApiProperty({ description: 'Original video URL (S3, HTTP, etc.)' })
    @IsUrl()
    videoUrl: string;
}
