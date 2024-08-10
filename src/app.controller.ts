import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Status')
@Controller()
export class AppController {
  @Get('status')
  getStatus() {
    return {
      status: 'ok',
    };
  }
}
