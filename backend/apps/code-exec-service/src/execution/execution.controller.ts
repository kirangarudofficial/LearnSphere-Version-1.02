import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ExecutionService } from './execution.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';

@ApiTags('Code Execution')
@Controller('execute')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ExecutionController {
    constructor(private readonly executionService: ExecutionService) { }

    @Post()
    async executeCode(@Body() dto: { code: string; language: string; input?: string }) {
        return this.executionService.executeCode(dto.code, dto.language, dto.input);
    }

    @Post('validate')
    async validateCode(@Body() dto: { code: string; language: string }) {
        return this.executionService.validateCode(dto.code, dto.language);
    }

    @Post('test')
    async runTests(@Body() dto: { code: string; tests: any[]; language: string }) {
        return this.executionService.runTests(dto.code, dto.tests, dto.language);
    }

    @Get(':id/result')
    async getExecutionResult(@Param('id') id: string) {
        return this.executionService.getExecutionResult(id);
    }
}
