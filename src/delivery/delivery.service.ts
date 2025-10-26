import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DeliveryService {
  private pool = new Pool({ connectionString: process.env.DATABASE_URL });

  async updateDelivery(orderId: number, location: { lat: number; lng: number }, photoUrl: string) {
    await this.pool.query(
      'UPDATE deliveries SET location_lat = $1, location_lng = $2, door_photo_url = $3, status = $4 WHERE order_id = $5',
      [location.lat, location.lng, photoUrl, 'delivered', orderId]
    );
    return { message: 'Delivery updated' };
  }
}