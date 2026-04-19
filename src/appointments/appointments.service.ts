import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(entityId: number) {
    return this.prisma.appointment.findMany({
      where: { entityId },
      include: {
        patient: { select: { id: true, name: true, phone: true } },
        user: { select: { id: true, name: true } },
      },
      orderBy: { scheduledAt: 'asc' },
    });
  }

  async findOne(id: number, entityId: number) {
    return this.prisma.appointment.findFirst({
      where: { id, entityId },
      include: {
        patient: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async create(data: {
    patientId: number;
    userId: number;
    entityId: number;
    scheduledAt: Date;
    notes?: string;
  }) {
    return this.prisma.appointment.create({
      data,
      include: {
        patient: { select: { id: true, name: true, phone: true } },
        user: { select: { id: true, name: true } },
      },
    });
  }

  async update(id: number, data: {
    scheduledAt?: Date;
    status?: string;
    notes?: string;
  }) {
    return this.prisma.appointment.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.appointment.delete({ where: { id } });
  }

  async findByPatient(patientId: number, entityId: number) {
    return this.prisma.appointment.findMany({
      where: { patientId, entityId },
      orderBy: { scheduledAt: 'desc' },
    });
  }
}
