import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyHelmet from '@fastify/helmet';
import compression from '@fastify/compress';
import AppModule from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  await app.register(compression);

  await app.register(fastifyHelmet);

  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    skipNullProperties: true,
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
