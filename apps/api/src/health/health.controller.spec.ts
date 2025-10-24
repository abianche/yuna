import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let healthController: HealthController;
  const prismaMock = {
    $queryRaw: jest.fn(),
  };

  beforeEach(async () => {
    Logger.overrideLogger(false);

    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        HealthService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  describe('healthz', () => {
    it('should return status ok', async () => {
      await expect(healthController.healthz()).resolves.toEqual({ status: 'ok' });
    });
  });

  describe('readyz', () => {
    it('should return status ready', async () => {
      prismaMock.$queryRaw.mockResolvedValueOnce([{ 1: 1 }]);
      await expect(healthController.readyz()).resolves.toEqual({
        status: 'ready',
        database: 'connected',
      });
    });

    it('should return status not ready', async () => {
      Logger.overrideLogger(false);

      prismaMock.$queryRaw.mockRejectedValueOnce(new Error('Database connection failed'));
      await expect(healthController.readyz()).rejects.toThrow('Database connection failed');
    });
  });
});
