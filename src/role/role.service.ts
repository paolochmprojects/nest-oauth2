import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { DatabaseService } from 'src/database/database.service';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(private db: DatabaseService) {}
  create(createRoleDto: CreateRoleDto) {
    return this.db.role.create({ data: createRoleDto });
  }

  findAll(): Promise<Role[]> {
    return this.db.role.findMany();
  }

  async findOne(id: string, raiseError = true): Promise<Role | null> {
    const role = await this.db.role.findUnique({ where: { id } });

    if (!role && raiseError) {
      throw new BadRequestException('Role not found');
    }

    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    await this.findOne(id);

    const role = await this.db.role.update({
      where: { id },
      data: updateRoleDto,
    });

    return role;
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.db.role.delete({ where: { id } });

    return { deleted: true };
  }
}
