import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { Module } from '@nestjs/common';
import { ProfileModule } from './modules/profile/profile.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AuthModule, HealthModule, ProfileModule, UsersModule],
})
export class AppModule {}
