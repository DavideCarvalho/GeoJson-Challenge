import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Partner } from './domain';
import { PartnerService } from './service';
import { PartnerRepository } from './repository';
import { PartnerController } from './controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Partner', schema: Partner }]),
  ],
  controllers: [
    PartnerController,
  ],
  providers: [
    PartnerService,
    PartnerRepository,
  ],
})
export class PartnerModule {
}
