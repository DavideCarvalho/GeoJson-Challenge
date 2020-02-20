import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { partner1 } from './partner1';
import { partner2 } from './partner2';


function randomNumberBetween(from: number, to: number) {
  return Math.floor((Math.random() * to) + from);
}

describe('PartnerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return 404 if user with passed id doesnt exist', () => {
    return request(app.getHttpServer())
      .get(`/api/v1/partner/${randomNumberBetween(1, 10000)}`)
      .expect(404);
  });

  it('should return 200 if user with passed id exists', () => {
    const randomId = randomNumberBetween(1, 10000);
    return request(app.getHttpServer())
      .post(`/api/v1/partner`)
      .send({ ...partner1, id: randomId })
      .expect(201)
      .then(() => {
        return request(app.getHttpServer())
          .get(`/api/v1/partner/${randomId}`)
          .expect(200);
      });
  });

  it('should return the nearest partner', () => {
    const randomId1 = randomNumberBetween(1, 10000);
    const randomId2 = randomNumberBetween(1, 10000);
    return request(app.getHttpServer())
      .post(`/api/v1/partner`)
      .send({ ...partner1, id: randomId1 })
      .expect(201)
      .then(() => {
        return request(app.getHttpServer())
          .post(`/api/v1/partner`)
          .send({ ...partner2, id: randomId2 })
          .expect(201)
          .then(() => {
            return request(app.getHttpServer())
              .get(`/api/v1/partner/lat/-43/long/-6`)
              .expect(200)
              .expect(_res => {
                expect(_res.body[0].id).toBe(randomId2);
              });
          });
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
