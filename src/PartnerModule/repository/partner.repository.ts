import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Partner } from '../domain';
import { IFindNearestOptions, IPartner } from '../interface';
import { PartnerDTO } from '../dto';

@Injectable()
export class PartnerRepository {

  constructor(@InjectModel('Partner') private readonly partnerModel: Model<IPartner>) {
  }

  public async findNearestByCoordinates(lat: number, long: number, options: IFindNearestOptions = {}): Promise<IPartner[]> {
    return this.partnerModel.find({
      coverageArea: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [long, lat],
          },
        },
      },
    }, null, options);
  }

  public async save(newPartner: PartnerDTO): Promise<IPartner> {
    return new this.partnerModel(newPartner).save();
  }

  public async findById(id: string): Promise<IPartner> {
    return this.partnerModel.findOne({ id });
  }

}
