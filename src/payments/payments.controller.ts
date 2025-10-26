import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { userId: number };
}

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('checkout')
  async checkout(@Body() body: { cartId: number; paymentMethod: string }, @Req() req: AuthenticatedRequest) {
    return this.paymentsService.checkout(req.user.userId, body.cartId, body.paymentMethod);
  }
}