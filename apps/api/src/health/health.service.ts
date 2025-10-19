import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async checkHealth() {
    return { status: 'ok' };
  }

  async checkReadiness() {
    try {
      // Check database connection
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ready', database: 'connected' };
    } catch {
      throw new Error('Database connection failed');
    }
  }
}
