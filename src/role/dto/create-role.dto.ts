import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'The name of the role',
  })
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @ApiProperty({
    example: 'Administrator role',
    description: 'The description of the role',
  })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;
}
