import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([]);
  }

  @Get('readiness')
  @HealthCheck()
  checkReadiness() {
    return this.health.check([
      () => this.http.pingCheck('http check', 'http://localhost:3000/health'),
    ]);
  }
}
