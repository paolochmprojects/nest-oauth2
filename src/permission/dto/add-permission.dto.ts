import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class AddPermissionDto {
  @ApiProperty({
    type: [String],
    example: ['21fcd3c6-4c5e-4f0c-9b8e-9b8e9b8e9b8e'],
  })
  @IsArray()
  @IsUUID('all', { each: true })
  roleId: string[];
}
