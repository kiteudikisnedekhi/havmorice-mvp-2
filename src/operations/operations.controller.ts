import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('operations')
@UseGuards(JwtAuthGuard)
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Get('orders')
  async getOrders() {
    return this.operationsService.getOrders();
  }

  @Post('refund')
  async processRefund(@Body() body: { orderId: number }) {
    return this.operationsService.processRefund(body.orderId);
  }
}