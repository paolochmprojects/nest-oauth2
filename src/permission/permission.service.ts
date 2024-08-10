import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PermissionService {
  constructor(private db: DatabaseService) {}

  async findAll() {
    return this.db.permission.findMany();
  }
}
