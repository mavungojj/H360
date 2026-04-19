import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(@Request() req) {
    return this.usersService.findAll(req.user.entityId);
  }

  @Post()
  create(@Body() body, @Request() req) {
    return this.usersService.create({
      ...body,
      entityId: req.user.entityId,
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.usersService.updateUser(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(+id);
  }
}

