import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import dump from 'apps/config/env.dump';

@Injectable()
export default class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    if (this.configService.get<boolean>('dump')) {
      this.logger.debug(dump(this.configService));
    }
  }

  getIndex() {
    const data = {
      version: this.configService.get<string>('service.version'),
      name: this.configService.get<string>('service.name'),
      hostname: this.configService.get<string>('service.hostname'),
      started_at: this.configService.get<Date>('service.startedAt'),
      engines: <object>undefined,
      endpoints: <object>undefined,
    };

    if (this.configService.get<boolean>('debug')) {
      data.engines = this.configService.get<object>('service.engines');
      data.endpoints = this.configService.get<object>('service.endpoints');
    }

    return data;
  }
}
