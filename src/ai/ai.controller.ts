import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('symptoms')
  analyzeSymptoms(@Body() body: { symptoms: string; patientHistory?: string }) {
    return this.aiService.analyzeSymptons(body.symptoms, body.patientHistory);
  }

  @Post('exam')
  analyzeExam(@Body() body: { examType: string; result: string; patientHistory?: string }) {
    return this.aiService.analyzeExamResult(body.examType, body.result, body.patientHistory);
  }

  @Post('summarize')
  summarizeHistory(@Body() body: { medicalHistory: string }) {
    return this.aiService.summarizeHistory(body.medicalHistory);
  }
}

