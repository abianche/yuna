import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    return this.prisma.project.findFirst({
      where: { id, ownerId: userId },
    });
  }

  async create(data: { name: string; description?: string }, userId: string) {
    return this.prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        ownerId: userId,
      },
    });
  }

  async update(id: string, data: { name?: string; description?: string }, userId: string) {
    // First verify the project exists and belongs to the user
    const project = await this.prisma.project.findFirst({
      where: { id, ownerId: userId },
    });

    if (!project) {
      return null;
    }

    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, userId: string) {
    // First verify the project exists and belongs to the user
    const project = await this.prisma.project.findFirst({
      where: { id, ownerId: userId },
    });

    if (!project) {
      return null;
    }

    return this.prisma.project.delete({
      where: { id },
    });
  }
}
