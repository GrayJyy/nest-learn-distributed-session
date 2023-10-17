import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { SessionService } from './session/session.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(SessionService)
  private readonly sessionService: SessionService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('count')
  async count(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const _sid = req.cookies?.sid;
    const { count } = await this.sessionService.getSession<{
      count: string;
    }>(_sid);
    const _currentCount = count ? parseInt(count) + 1 : 1;
    const _currentSid = await this.sessionService.setSession(_sid, {
      count: _currentCount,
    });
    res.cookie('sid', _currentSid, { maxAge: 1000000 });
    return _currentCount;
  }
}
