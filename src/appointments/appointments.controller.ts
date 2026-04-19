import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Get()
  findAll(@Request() req) {
    return this.appointmentsService.findAll(req.user.entityId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.appointmentsService.findOne(+id, req.user.entityId);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string, @Request() req) {
    return this.appointmentsService.findByPatient(+patientId, req.user.entityId);
  }

  @Post()
  create(@Body() body, @Request() req) {
    return this.appointmentsService.create({
      ...body,
      entityId: req.user.entityId,
      userId: req.user.id,
      scheduledAt: new Date(body.scheduledAt),
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.appointmentsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}