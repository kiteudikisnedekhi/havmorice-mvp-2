import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class SubscriptionsService {
  private pool = new Pool({ connectionString: process.env.DATABASE_URL });

  async createSubscription(userId: number, cartId: number, interval: string) {
    await this.pool.query('INSERT INTO subscriptions (user_id, cart_id, interval, status) VALUES ($1, $2, $3, $4)', [userId, cartId, interval, 'active']);
    return { message: 'Subscription created' };
  }

  async getSubscriptions(userId: number) {
    const result = await this.pool.query('SELECT * FROM subscriptions WHERE user_id = $1', [userId]);
    return result.rows;
  }

  async pauseSubscription(subscriptionId: number) {
    await this.pool.query('UPDATE subscriptions SET status = $1 WHERE id = $2', ['paused', subscriptionId]);
    return { message: 'Subscription paused' };
  }
}