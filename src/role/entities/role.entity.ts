import { Role as PrismaRole } from '@prisma/client';

export class Role implements PrismaRole {
  id: string;
  description: string | null;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
