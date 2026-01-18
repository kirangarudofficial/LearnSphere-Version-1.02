import { IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddItemDto {
    @ApiProperty()
    @IsString()
    courseId: string;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    price: number;
}
