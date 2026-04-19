import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  async findAll(entityId: number) {
    return this.prisma.exam.findMany({
      where: { entityId },
      include: {
        patient: { select: { id: true, name: true, phone: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, entityId: number) {
    return this.prisma.exam.findFirst({
      where: { id, entityId },
      include: { patient: true },
    });
  }

  async findByPatient(patientId: number, entityId: number) {
    return this.prisma.exam.findMany({
      where: { patientId, entityId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: {
    patientId: number;
    entityId: number;
    type: string;
    labPartner?: string;
    examDate?: Date;
  }) {
    return this.prisma.exam.create({
      data,
      include: {
        patient: { select: { id: true, name: true } },
      },
    });
  }

  async updateResult(id: number, data: {
    result?: string;
    status?: string;
    examDate?: Date;
  }) {
    return this.prisma.exam.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.exam.delete({ where: { id } });
  }
}