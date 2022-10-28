import { Controller, Get } from '@nestjs/common';
import AppService from './app.service';

@Controller()
export default class AppController {
  constructor(private readonly service: AppService) {}

  @Get()
  getIndex() {
    return this.service.getIndex();
  }
}
