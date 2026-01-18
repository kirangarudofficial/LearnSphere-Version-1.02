import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class ExecutionService {
    private readonly TIMEOUT = 5000; // 5 seconds
    private readonly MAX_MEMORY = '128m';

    constructor(private readonly prisma: PrismaService) { }

    async executeCode(code: string, language: string, input?: string) {
        // Validate language
        const supportedLanguages = ['python', 'javascript', 'java', 'cpp'];
        if (!supportedLanguages.includes(language)) {
            throw new BadRequestException(`Unsupported language: ${language}`);
        }

        // Create execution record
        const execution = await this.prisma.codeExecution.create({
            data: {
                code,
                language,
                input,
                status: 'RUNNING',
            },
        });

        try {
            const result = await this.runCodeInSandbox(code, language, input);

            await this.prisma.codeExecution.update({
                where: { id: execution.id },
                data: {
                    status: 'COMPLETED',
                    output: result.output,
                    executionTime: result.executionTime,
                },
            });

            return {
                executionId: execution.id,
                output: result.output,
                executionTime: result.executionTime,
                status: 'success',
            };
        } catch (error) {
            await this.prisma.codeExecution.update({
                where: { id: execution.id },
                data: {
                    status: 'FAILED',
                    error: error.message,
                },
            });

            return {
                executionId: execution.id,
                error: error.message,
                status: 'failed',
            };
        }
    }

    async validateCode(code: string, language: string) {
        // Syntax validation
        const forbidden = ['eval', 'exec', '__import__', 'require', 'import', 'fs', 'child_process'];
        const hasForbidden = forbidden.some(keyword => code.includes(keyword));

        if (hasForbidden) {
            return { valid: false, errors: ['Code contains forbidden keywords'] };
        }

        return { valid: true, errors: [] };
    }

    async runTests(code: string, tests: any[], language: string) {
        const results = [];

        for (const test of tests) {
            const result = await this.executeCode(code, language, test.input);
            results.push({
                ...test,
                passed: result.output?.trim() === test.expectedOutput?.trim(),
                actualOutput: result.output,
            });
        }

        return {
            totalTests: tests.length,
            passed: results.filter(r => r.passed).length,
            failed: results.filter(r => !r.passed).length,
            results,
        };
    }

    async getExecutionResult(executionId: string) {
        return this.prisma.codeExecution.findUnique({
            where: { id: executionId },
        });
    }

    private async runCodeInSandbox(code: string, language: string, input?: string) {
        const startTime = Date.now();

        // Mock execution - in production, use Docker containers or VM
        // Example: docker run --rm -m ${MAX_MEMORY} -timeout ${TIMEOUT} sandbox-${language}

        let output = '';

        switch (language) {
            case 'python':
                output = 'Python code executed successfully';
                break;
            case 'javascript':
                output = 'JavaScript code executed successfully';
                break;
            default:
                output = 'Code executed';
        }

        const executionTime = Date.now() - startTime;

        return { output, executionTime };
    }
}
