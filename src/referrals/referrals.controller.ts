import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ReferralsService } from './referrals.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { userId: number };
}

@Controller('referrals')
@UseGuards(JwtAuthGuard)
export class ReferralsController {
  constructor(private readonly referralsService: ReferralsService) {}

  @Get('rewards')
  async getRewards(@Req() req: AuthenticatedRequest) {
    return this.referralsService.getRewards(req.user.userId);
  }
}