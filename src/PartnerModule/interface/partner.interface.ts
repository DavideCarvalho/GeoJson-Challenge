import { Document } from 'mongoose';
import { ICoverageArea } from './coverage-area.interface';
import { IAddress } from './address.interface';

export interface IPartner extends Document {
  id: number;
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: ICoverageArea;
  address: IAddress;
}
