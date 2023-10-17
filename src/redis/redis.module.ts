import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';
import config from '../config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [config] })],
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        const _client = createClient({
          socket: {
            host: configService.get('application.redis.host'),
            port: configService.get('application.redis.port'),
          },
        });
        await _client.connect();
        return _client;
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
