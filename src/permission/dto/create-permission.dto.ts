import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    example: 'create-role',
    description: 'The name of the permission',
  })
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The id of the role',
  })
  @IsUUID(undefined, { message: 'Role id must be a valid UUID' })
  roleId: string;
}
