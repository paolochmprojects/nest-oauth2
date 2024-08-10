import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './add-permission.dto';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
