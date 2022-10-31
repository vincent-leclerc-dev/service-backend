import { ConfigService } from '@nestjs/config';

export default function dump(configService: ConfigService) {
  const configServicePlain: any = { ...configService };
  const config: any = { ...configServicePlain.internalConfig };

  /* eslint-disable no-underscore-dangle */
  delete config._PROCESS_ENV_VALIDATED;
  /* eslint-enable no-underscore-dangle */

  // hide here sensible data
  config.db.uri = !!config.db.uri;

  return config;
}
