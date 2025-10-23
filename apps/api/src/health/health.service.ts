import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(private readonly prisma: PrismaService) {}

  async checkHealth() {
    return { status: 'ok' };
  }

  async checkReadiness() {
    try {
      // Check database connection
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ready', database: 'connected' };
    } catch (error) {
      this.logger.error('Database connection check failed', error);
      throw new Error('Database connection failed');
    }
  }
}
