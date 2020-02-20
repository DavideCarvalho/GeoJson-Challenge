import { IsArray, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';

export class CoverageAreaDTO {
  @IsEnum(['MultiPolygon'])
  @Expose()
  public type = 'MultiPolygon';

  @IsArray()
  @Expose()
  public coordinates: number[][][][];
}

