import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '../config/index';
import validate from './env.validate';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validate,
      cache: true,
      isGlobal: true,
      load: [config],
    }),
  ],
})
export default class GlobalConfigModule {}
