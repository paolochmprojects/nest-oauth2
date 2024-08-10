import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
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

  async addPerissionToRole(roleId: string, permissionId: string) {
    const role = await this.roleService.findById(roleId);
    const permission = await this.findById(permissionId);
    await this.db.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          permissionId: permission.id,
          roleId: role.id,
        },
      },
      update: {},
      create: {
        roleId: role.id,
        permissionId,
      },
    });

    return { added: true };
  }

  async removePermissionFromRole(permissionId: string, roleId: string) {
    const role = await this.roleService.findById(roleId);
    const permission = await this.findById(permissionId);

    await this.db.rolePermission.deleteMany({
      where: {
        roleId: role.id,
        permissionId: permission.id,
      },
    });

    return { deleted: true };
  }
}
