import { Controller, Get, Post, Delete, Query, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';

@ApiTags('Search')
@Controller('search')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SearchController {
    constructor(private readonly searchService: SearchService) { }

    @Get('courses')
    async searchCourses(@Query('q') query: string, @Query() filters: any) {
        return this.searchService.searchCourses(query, filters);
    }

    @Get('content')
    async searchContent(@Query('q') query: string, @Query('courseId') courseId?: string) {
        return this.searchService.searchContent(query, courseId);
    }

    @Get('users')
    async searchUsers(@Query('q') query: string, @Query('role') role?: string) {
        return this.searchService.searchUsers(query, role);
    }

    @Post('index')
    async indexDocument(@Body() dto: { type: string; id: string; data: any }) {
        return this.searchService.indexDocument(dto.type, dto.id, dto.data);
    }

    @Delete('index/:type/:id')
    async removeDocument(@Param('type') type: string, @Param('id') id: string) {
        return this.searchService.removeDocument(type, id);
    }
}
