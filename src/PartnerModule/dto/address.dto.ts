import { IsArray, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';

export class AddressDTO {
  @IsEnum(['Point'])
  @Expose()
  public type = 'Point';

  @IsArray()
  @Expose()
  public coordinates: number[];
}
