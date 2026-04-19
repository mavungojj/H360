import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async findByEntity(entityId: number) {
    return this.prisma.subscription.findUnique({
      where: { entityId },
      include: { entity: { select: { id: true, name: true, email: true } } },
    });
  }

  async create(data: {
    entityId: number;
    plan: string;
    endDate?: Date;
  }) {
    return this.prisma.subscription.create({ data });
  }

  async update(entityId: number, data: {
    plan?: string;
    status?: string;
    endDate?: Date;
  }) {
    return this.prisma.subscription.update({
      where: { entityId },
      data,
    });
  }

  async findAll() {
    return this.prisma.subscription.findMany({
      include: { entity: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}