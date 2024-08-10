import { Permission as PrismaPermission, Model, Action } from '@prisma/client';

export class Permission implements PrismaPermission {
  id: string;
  name: string;
  model: Model;
  action: Action;
  createdAt: Date;
  updatedAt: Date;
}
