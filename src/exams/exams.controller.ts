import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('exams')
export class ExamsController {
  constructor(private examsService: ExamsService) {}

  @Get()
  findAll(@Request() req) {
    return this.examsService.findAll(req.user.entityId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.examsService.findOne(+id, req.user.entityId);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string, @Request() req) {
    return this.examsService.findByPatient(+patientId, req.user.entityId);
  }

  @Post()
  create(@Body() body, @Request() req) {
    return this.examsService.create({
      ...body,
      entityId: req.user.entityId,
      examDate: body.examDate ? new Date(body.examDate) : undefined,
    });
  }

  @Put(':id')
  updateResult(@Param('id') id: string, @Body() body) {
    return this.examsService.updateResult(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examsService.remove(+id);
  }
}