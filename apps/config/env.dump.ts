import { ConfigService } from '@nestjs/config';

export default function dump(configService: ConfigService) {
  const configServicePlain: any = { ...configService };
  const config: any = { ...configServicePlain.internalConfig };

  // eslint-disable-next-line no-underscore-dangle
  delete config._PROCESS_ENV_VALIDATED;

  // hide here sensible data
  config.db.uri = !!config.db.uri;

  return config;
}
