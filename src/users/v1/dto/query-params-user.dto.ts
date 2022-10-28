import {
  IsNumber, IsOptional, Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export default class QueryParamsUserDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
    skip?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
    limit?: number;
}
