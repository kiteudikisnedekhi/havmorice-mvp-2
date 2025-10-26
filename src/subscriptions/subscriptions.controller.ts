import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { userId: number };
}

@Controller('subscriptions')
@UseGuards(JwtAuthGuard)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post('create')
  async createSubscription(@Body() body: { cartId: number; interval: string }, @Req() req: AuthenticatedRequest) {
    return this.subscriptionsService.createSubscription(req.user.userId, body.cartId, body.interval);
  }

  @Get()
  async getSubscriptions(@Req() req: AuthenticatedRequest) {
    return this.subscriptionsService.getSubscriptions(req.user.userId);
  }

  @Post('pause')
  async pauseSubscription(@Body() body: { subscriptionId: number }) {
    return this.subscriptionsService.pauseSubscription(body.subscriptionId);
  }
}