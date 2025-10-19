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
    // TODO: Add actual readiness checks (database connectivity, external services, etc.)
    return {
      status: 'ready',
      timestamp: new Date().toISOString(),
    };
  }
}
