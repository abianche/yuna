import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('/health')
  health() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('/healthz')
  healthz() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('/readyz')
  readyz() {
    return {
      status: 'ready',
      timestamp: new Date().toISOString(),
    };
  }
}
