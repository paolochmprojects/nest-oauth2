import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt,guard';
import { Permission } from 'src/role/decorators/permission.decorator';
import { RolePermissionGuard } from 'src/role/guards/permission.guard';
import { PermissionService } from './permission.service';

@ApiTags('Permissions')
@ApiBearerAuth()
@Controller('permission')
@UseGuards(JwtAuthGuard, RolePermissionGuard)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @Permission('READ_PERMISSION')
  findAll() {
    return this.permissionService.findAll();
  }

  @Post(':permissionId/role/:roleId')
  @Permission('CREATE_ROLEPERMISSION')
  create(
    @Param('permissionId', ParseUUIDPipe) permissionId: string,
    @Param('roleId', ParseUUIDPipe) roleId: string,
  ) {
    return this.permissionService.addPerissionToRole(roleId, permissionId);
  }

  @Delete(':permissionId/role/:roleId')
  @Permission('DELETE_ROLEPERMISSION')
  remove(
    @Param('permissionId', ParseUUIDPipe) permissionId: string,
    @Param('roleId', ParseUUIDPipe) roleId: string,
  ) {
    return this.permissionService.removePermissionFromRole(
      permissionId,
      roleId,
    );
  }
}
