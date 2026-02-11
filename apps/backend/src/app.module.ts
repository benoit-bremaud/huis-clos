import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, HealthModule],
})
export class AppModule {}
