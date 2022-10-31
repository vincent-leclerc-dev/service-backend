import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import fastifyHelmet from '@fastify/helmet';
import compression from '@fastify/compress';
import ApiModule from './api.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ApiModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Manage users and their preferences')
    .setVersion('1.0')
    .addTag('users')
    .addTag('preferences')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.register(compression);

  await app.register(fastifyHelmet);

  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    skipNullProperties: false,
    skipUndefinedProperties: false,
    transform: false,
    whitelist: true,
  }));

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableCors();

  await app.listen(app.get(ConfigService).get<string>('server.port'), '0.0.0.0');
}

bootstrap();
