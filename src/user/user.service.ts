import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserService {
  constructor(
    private db: DatabaseService,
    private roleService: RoleService,
  ) {}

  async getByEmail(email: string, raiseError = true): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: {
        email,
      },
      include: {
        account: true,
      },
    });

    if (!user && raiseError) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getById(
    id: string,
    raiseError = true,
    withProfile = false,
    withAccount = false,
    withRole = false,
  ): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: {
        id,
      },
      include: {
        role: withRole,
        profile: withProfile,
        account: withAccount,
      },
    });

    if (!user && raiseError) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(userData: CreateUserDto, raiseError = true) {
    const user = await this.getByEmail(userData.email, raiseError);

    if (user && raiseError)
      throw new BadRequestException('User already exists');

    const userRole = await this.roleService.findByName('USER', false);

    if (!userRole) {
      throw new BadRequestException('User role not found');
    }

    const newUser = await this.db.user.create({
      data: { ...userData, roleId: userRole.id },
    });

    return newUser;
  }
}
