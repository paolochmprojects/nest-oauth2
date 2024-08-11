import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './user.controller';
import { RoleModule } from 'src/role/role.module';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [DatabaseModule, RoleModule],
  controllers: [UserController],
})
export class UserModule {}
