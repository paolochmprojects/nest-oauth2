import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { DatabaseModule } from 'src/database/database.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [DatabaseModule, RoleModule],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
