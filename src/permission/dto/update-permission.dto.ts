import { PartialType } from '@nestjs/mapped-types';
import { AddPermissionDto } from './add-permission.dto';

export class UpdatePermissionDto extends PartialType(AddPermissionDto) {}
