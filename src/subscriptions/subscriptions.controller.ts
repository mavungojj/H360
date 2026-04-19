import { Controller, Get, Post, Put, Body, UseGuards, Request } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @Get('my')
  findMy(@Request() req) {
    return this.subscriptionsService.findByEntity(req.user.entityId);
  }

  @Get()
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @Post()
  create(@Body() body, @Request() req) {
    return this.subscriptionsService.create({
      ...body,
      entityId: req.user.entityId,
      endDate: body.endDate ? new Date(body.endDate) : undefined,
    });
  }

  @Put()
  update(@Body() body, @Request() req) {
    return this.subscriptionsService.update(req.user.entityId, {
      ...body,
      endDate: body.endDate ? new Date(body.endDate) : undefined,
    });
  }
}