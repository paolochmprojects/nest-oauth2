import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt,guard';
import { Permission } from 'src/role/decorators/permission.decorator';
import { RolePermissionGuard } from 'src/role/guards/permission.guard';
import { PermissionService } from './permission.service';

@ApiTags('Permissions')
@ApiBearerAuth()
@Controller('permission')
@UseGuards(JwtAuthGuard)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @Permission('READ_PERMISSION')
  @UseGuards(RolePermissionGuard)
  findAll() {
    return this.permissionService.findAll();
  }
}
