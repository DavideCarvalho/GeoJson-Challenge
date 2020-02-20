import * as mongoose from 'mongoose';
import { CoverageArea } from './coverage-area';
import { Address } from './address';
import { IPartner } from '../interface';

export const Partner = new mongoose.Schema<IPartner>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  tradingName: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  document: {
    type: String,
    required: true,
  },
  coverageArea: CoverageArea,
  address: Address,
});
Partner.index({ coverageArea: '2dsphere', address: '2dsphere' });
