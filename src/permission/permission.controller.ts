import {
  Body,
  Controller,
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
import { AddPermissionDto } from './dto/add-permission.dto';

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

  @Post(':roleId')
  @Permission('CREATE_ROLEPERMISSION')
  create(
    @Param('roleId', ParseUUIDPipe) roleId: string,
    @Body() addPermissionDto: AddPermissionDto,
  ) {
    return this.permissionService.addPerissionToRole(roleId, addPermissionDto);
  }
}
