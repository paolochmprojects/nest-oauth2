import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RolePermissionGuard implements CanActivate {
  constructor(
    private db: DatabaseService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.user;

    if (!userId) return false;

    const permission = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );

    const user = await this.db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        role: {
          include: {
            RolePermission: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    if (user.isSuperAdmin) return true;

    if (!user.roleId) return false;

    const permissionsInRole = user.role.RolePermission.find(
      (perm) => perm.permission.name === permission,
    );
    if (!permissionsInRole) return false;
    return true;
  }
}
