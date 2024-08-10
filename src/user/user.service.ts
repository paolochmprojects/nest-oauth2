import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  async getByEmail(email: string, raiseError = true): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user && raiseError) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getById(id: string, raiseError = true): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: {
        id,
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

    const newUser = await this.db.user.create({
      data: { ...userData },
    });

    return newUser;
  }
}
