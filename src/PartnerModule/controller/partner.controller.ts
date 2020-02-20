import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { PartnerService } from '../service';
import { IPartner } from '../interface';
import { CoordinatesDTO, PartnerDTO } from '../dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

@Controller('api/v1/partner')
@ApiTags('Partner')
export class PartnerController {

  constructor(private service: PartnerService) {
  }

  @Get('lat/:lat/long/:long')
  @HttpCode(200)
  @ApiQuery({ name: 'limit', required: false, type: Number })
  public async findNearestByCoordinates(
    @Param() coordinates: CoordinatesDTO,
    @Query('limit') limit?: number,
  ): Promise<PartnerDTO[]> {
    return plainToClass<PartnerDTO, IPartner>(
      PartnerDTO,
      await this.service.findNearestByCoordinates(coordinates, { limit }),
      { excludeExtraneousValues: true },
    );
  }

  @Post()
  @HttpCode(201)
  public async save(
    @Body() body: PartnerDTO,
  ): Promise<PartnerDTO> {
    const savedPartner = await this.service.save(body);
    return plainToClass<PartnerDTO, IPartner>(
      PartnerDTO,
      savedPartner,
      { excludeExtraneousValues: true },
    );
  }

  @Get(':id')
  @HttpCode(200)
  public async findById(@Param('id') id: string): Promise<PartnerDTO> {
    return plainToClass<PartnerDTO, IPartner>(
      PartnerDTO,
      await this.service.findById(id),
      { excludeExtraneousValues: true },
    );
  }

}
