import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('healthz')
  async healthz() {
    return this.healthService.checkHealth();
  }

  @Get('readyz')
  async readyz() {
    return this.healthService.checkReadiness();
  }
}
