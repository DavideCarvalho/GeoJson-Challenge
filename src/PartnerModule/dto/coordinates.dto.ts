import { IsNumberString } from 'class-validator';

export class CoordinatesDTO {
  @IsNumberString()
  lat: number;
  @IsNumberString()
  long: number;
}
