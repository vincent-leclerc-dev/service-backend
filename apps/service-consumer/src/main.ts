import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import AppModule from './app.module';
import AppService from './app.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  const port = app.get(ConfigService).get<string>('consumer.port');
  const host = app.get(ConfigService).get<string>('consumer.host');

  await app.listen(port, host);

  new Logger(AppService.name).log(`Server is running on ${host}:${port}`);
}

bootstrap();
