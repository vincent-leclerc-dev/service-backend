import { Controller, Get } from '@nestjs/common';
import AppService from './api.service';

@Controller()
export default class AppController {
  constructor(private readonly service: AppService) {}

  @Get()
  getIndex() {
    return this.service.getIndex();
  }
}
