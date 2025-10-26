import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('delivery')
@UseGuards(JwtAuthGuard)
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post('update')
  async updateDelivery(@Body() body: { orderId: number; location: { lat: number; lng: number }; photoUrl: string }) {
    return this.deliveryService.updateDelivery(body.orderId, body.location, body.photoUrl);
  }
}