import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @Get()
  findAll(@Request() req) {
    return this.patientsService.findAll(req.user.entityId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.patientsService.findOne(+id, req.user.entityId);
  }

  @Post()
  create(@Body() body, @Request() req) {
    return this.patientsService.create({ ...body, entityId: req.user.entityId });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body, @Request() req) {
    return this.patientsService.update(+id, req.user.entityId, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}