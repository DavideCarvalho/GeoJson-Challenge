import { MongoMemoryServer } from 'mongodb-memory-server';
import { Module, OnApplicationShutdown } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { PartnerModule } from './PartnerModule';

let uri = process.env.MONGODB_URI;
let mongod;
if (process.env.NODE_ENV !== 'PROD') {
  mongod = new MongoMemoryServer();
}

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (): Promise<MongooseModuleOptions> => {
        if (process.env.NODE_ENV !== 'PROD') {
          uri = await mongod.getUri();
        }
        return {
          uri,
        };
      },
    }),
    PartnerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnApplicationShutdown {
  async onApplicationShutdown(signal: string) {
    await mongod.stop();
  }
}
