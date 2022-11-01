import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import compression from '@fastify/compress';
import fastifyHelmet from '@fastify/helmet';

import ApiModule from './api.module';
import ApiService from './api.service';
import UsersModule from './users/v1/users.module';
import EventsModule from './events/v1/events.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ApiModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  await app.register(compression);

  await app.register(fastifyHelmet);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    skipNullProperties: false,
    skipUndefinedProperties: false,
    transform: true,
    whitelist: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Manage users and their preferences')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [UsersModule, EventsModule],
  });
  SwaggerModule.setup('doc', app, document);

  const port = app.get(ConfigService).get<string>('server.port');
  const host = app.get(ConfigService).get<string>('server.host');

  await app.listen(port, host);

  new Logger(ApiService.name).log(`Server is running on ${host}:${port}`);
}

bootstrap();
