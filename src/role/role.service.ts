import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { DatabaseService } from 'src/database/database.service';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(private db: DatabaseService) {}
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = await this.findByName(createRoleDto.name, false);
    if (role) {
      throw new BadRequestException('Role already exists');
    }

    return this.db.role.create({ data: createRoleDto });
  }

  async findAll(): Promise<Role[]> {
    return this.db.role.findMany({
      include: { RolePermission: { include: { permission: true } } },
    });
  }

  async findByName(name: string, raiseError = true): Promise<Role | null> {
    const role = await this.db.role.findUnique({ where: { name } });

    if (!role && raiseError) {
      throw new BadRequestException('Role not found');
    }

    return role;
  }

  async findById(id: string, raiseError = true): Promise<Role | null> {
    const role = await this.db.role.findUnique({
      where: { id },
      include: { RolePermission: { include: { permission: true } } },
    });

    if (!role && raiseError) {
      throw new BadRequestException('Role not found');
    }

    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findById(id);

    if (role.name === 'USER' && updateRoleDto.name) {
      updateRoleDto.name = undefined;
    }

    const roleUpdated = await this.db.role.update({
      where: { id },
      data: updateRoleDto,
    });

    return roleUpdated;
  }

  async remove(id: string) {
    const role = await this.findById(id);

    if (role.name === 'USER')
      throw new BadRequestException('USER role cannot be deleted');
    await this.db.role.delete({ where: { id } });

    return { deleted: true };
  }
}
