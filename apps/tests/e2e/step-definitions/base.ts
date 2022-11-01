import { binding, before, after} from 'cucumber-tsflow';
import { Test, TestingModule } from '@nestjs/testing';
import ApiModule from '../../../api-gateway/src/api.module';
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify";
import compression from "@fastify/compress";
import fastifyHelmet from "@fastify/helmet";
import {ValidationPipe, VersioningType} from "@nestjs/common";
import {cleanUsers} from "../utils/mongoClient";
import {Workspace} from "./workspace";

// tslint:disable-next-line:max-classes-per-file
@binding([Workspace])
export class Base {
  constructor(protected workspace: Workspace) {}

  @before()
  public async before(): Promise<void> {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();

    this.workspace.app = moduleFixture.createNestApplication<NestFastifyApplication>(
        new FastifyAdapter(),
    );

    await this.workspace.app.register(compression);

    await this.workspace.app.register(fastifyHelmet);

    this.workspace.app.useGlobalPipes(new ValidationPipe({
      forbidNonWhitelisted: true,
      skipNullProperties: true,
      skipUndefinedProperties: false,
      transform: false,
      whitelist: true,
    }));

    this.workspace.app.enableVersioning({
      type: VersioningType.URI,
    });

    await this.workspace.app.init();
    await this.workspace.app.getHttpAdapter().getInstance().ready();

    await cleanUsers();
  }

  @after()
  public async after() {
    await this.workspace.app.close();
  }
}
