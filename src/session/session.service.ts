import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class SessionService {
  @Inject(RedisService)
  private readonly redisService: RedisService;

  private generateSid() {
    return Math.random().toString().slice(2, 12);
  }

  async setSession(
    sid: string,
    value: Record<string, any>,
    ttl: number = 30 * 60,
  ) {
    if (!sid) sid = this.generateSid();
    await this.redisService.hashSet(sid, value, ttl);
    return sid;
  }

  async getSession<SessionType extends Record<string, any>>(
    key: string,
  ): Promise<SessionType>;
  async getSession(key: string) {
    return await this.redisService.hashGet(key);
  }
}
