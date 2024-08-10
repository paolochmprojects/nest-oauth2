import { User as PrismaUser } from '@prisma/client';
export class User implements PrismaUser {
  id: string;
  name: string;
  email: string;
  isSuperAdmin: boolean;
  roleId: string;
  active: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
