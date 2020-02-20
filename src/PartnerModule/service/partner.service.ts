import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PartnerRepository } from '../repository';
import { IFindNearestOptions, IPartner } from '../interface';
import { CoordinatesDTO, PartnerDTO } from '../dto';

@Injectable()
export class PartnerService {

  constructor(private repository: PartnerRepository) {
  }

  public async findNearestByCoordinates(coordinates: CoordinatesDTO, options: IFindNearestOptions = {}): Promise<IPartner[]> {
    return this.repository.findNearestByCoordinates(coordinates.lat, coordinates.long, options);
  }

  public async save(body: PartnerDTO): Promise<IPartner> {
    try {
      return await this.repository.save(body);
    } catch (e) {
      console.error(e);
      if (e.code === 11000) {
        throw new ConflictException(`Partner with id ${body.id} already exists`);
      }
      if (e.code === 16755) {
        const indexOfLatitudeOutOfBounds = e.errmsg.indexOf('longitude/latitude is out of bounds');
        const latLongOutOfBounds = e.errmsg.substring(indexOfLatitudeOutOfBounds, e.errmsg.length);
        throw new BadRequestException(latLongOutOfBounds);
      }
      throw new InternalServerErrorException();
    }
  }

  public async findById(id: string): Promise<IPartner> {
    const partner = await this.repository.findById(id);
    if (!partner) {
      throw new NotFoundException('Partner not found');
    }
    return partner;
  }

}
