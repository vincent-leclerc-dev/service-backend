import { plainToClass } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
    SERVICE_MONGO_URI: string;
}

export default function validate(config: Record<string, unknown>) {
  const validateConfig = plainToClass(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: false },
  );

  const errors = validateSync(validateConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(`Environment variables validation encountered an error: ${errors.toString()}`);
  }

  return validateConfig;
}
