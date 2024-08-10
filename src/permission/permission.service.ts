import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AddPermissionDto } from './dto/add-permission.dto';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class PermissionService {
  constructor(
    private db: DatabaseService,
    private roleService: RoleService,
  ) {}

  async findAll() {
    return await this.db.permission.findMany();
  }

  async findById(id: string, raiseError = true) {
    const permission = await this.db.permission.findUnique({ where: { id } });

    if (!permission && raiseError) {
      throw new NotFoundException('Permission not found');
    }

    return permission;
  }

  async addPerissionToRole(roleId: string, addPermissionDto: AddPermissionDto) {
    const role = await this.roleService.findById(roleId);

    const permissions = await this.db.permission.findMany({
      where: {
        id: {
          in: addPermissionDto.roleId,
        },
      },
    });

    permissions.forEach(async (permission) => {
      await this.db.rolePermission.create({
        data: {
          permissionId: permission.id,
          roleId: role.id,
        },
      });
    });

    return { added: true };
  }
}
