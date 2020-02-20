import { CoverageAreaDTO } from './coverage-area.dto';
import { AddressDTO } from './address.dto';
import { IsNotEmpty, IsNumber, IsString, Min, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class PartnerDTO {
  @IsNumber()
  @Min(1)
  @Expose()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  tradingName: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  document: string;


  @Type(() => CoverageAreaDTO)
  @ValidateNested()
  @Expose()
  coverageArea: CoverageAreaDTO;


  @Type(() => AddressDTO)
  @ValidateNested()
  @Expose()
  address: AddressDTO;
}
