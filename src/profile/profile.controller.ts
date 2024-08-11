import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt,guard';
import { Permission } from 'src/role/decorators/permission.decorator';
import { RolePermissionGuard } from 'src/role/guards/permission.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolePermissionGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @Permission('READ_PROFILE')
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @Permission('READ_PROFILE')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  @Permission('UPDATE_PROFILE')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  @Permission('DELETE_PROFILE')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
