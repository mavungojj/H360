import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async findAll(entityId: number) {
    return this.prisma.patient.findMany({
      where: { entityId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, entityId: number) {
    return this.prisma.patient.findFirst({
      where: { id, entityId },
      include: {
        appointments: true,
        exams: true,
      },
    });
  }

  async create(data: {
    name: string;
    email?: string;
    phone?: string;
    cpf?: string;
    birthDate?: Date;
    gender?: string;
    address?: string;
    medicalHistory?: string;
    entityId: number;
  }) {
    return this.prisma.patient.create({ data });
  }

  async update(id: number, entityId: number, data: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    medicalHistory?: string;
  }) {
    return this.prisma.patient.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.patient.delete({ where: { id } });
  }
}