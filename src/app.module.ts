import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    AuthModule,
    DatabaseModule,
    UserModule,
    RoleModule,
    PermissionModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
