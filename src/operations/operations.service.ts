import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class OperationsService {
  private pool = new Pool({ connectionString: process.env.DATABASE_URL });

  async getOrders() {
    const result = await this.pool.query('SELECT * FROM orders');
    return result.rows;
  }

  async processRefund(orderId: number) {
    await this.pool.query('UPDATE orders SET status = $1 WHERE id = $2', ['refunded', orderId]);
    return { message: 'Refund processed' };
  }
}