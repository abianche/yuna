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
    // TODO: Implement actual readiness checks:
    // - Verify PostgreSQL database connectivity
    // - Verify Redis connectivity
    // - Check any external service dependencies
    // Return 503 Service Unavailable if any check fails
    return {
      status: 'ready',
      timestamp: new Date().toISOString(),
    };
  }
}
