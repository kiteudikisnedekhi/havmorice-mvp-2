import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import Razorpay from 'razorpay';  // Install: npm install razorpay

@Injectable()
export class PaymentsService {
  private pool = new Pool({ connectionString: process.env.DATABASE_URL });
  private razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  async checkout(userId: number, cartId: number, paymentMethod: string) {
    const cart = await this.pool.query('SELECT * FROM carts WHERE id = $1 AND user_id = $2', [cartId, userId]);
    if (!cart.rows.length) throw new Error('Cart not found');

    const items = await this.pool.query('SELECT * FROM cart_items WHERE cart_id = $1', [cartId]);
    let total = 0;
    for (const item of items.rows) {
      const variant = await this.pool.query('SELECT price_modifier FROM product_variants WHERE id = $1', [item.variant_id]);
      total += (variant.rows[0].price_modifier + 100) * item.quantity;  // Example calc
    }

    if (paymentMethod === 'wallet') {
      const wallet = await this.pool.query('SELECT balance, hg_coins FROM wallets WHERE user_id = $1', [userId]);
      if (wallet.rows[0].balance < total) throw new Error('Insufficient balance');
      await this.pool.query('UPDATE wallets SET balance = balance - $1 WHERE user_id = $2', [total, userId]);
    } else {
      // Razorpay integration
      const order = await this.razorpay.orders.create({ amount: total * 100, currency: 'INR' });
      return { orderId: order.id };
    }

    // Create order and trigger referrals
    const orderId = await this.createOrder(userId, cartId, total);
    await this.processReferrals(userId, orderId);
    return { message: 'Payment successful', orderId };
  }

  private async createOrder(userId: number, cartId: number, total: number) {
    const result = await this.pool.query('INSERT INTO orders (user_id, cart_id, total) VALUES ($1, $2, $3) RETURNING id', [userId, cartId, total]);
    return result.rows[0].id;
  }

  private async processReferrals(userId: number, orderId: number) {
    const referral = await this.pool.query('SELECT referrer_id FROM referrals WHERE beneficiary_id = $1 AND order_id IS NULL LIMIT 1', [userId]);
    if (referral.rows.length) {
      await this.pool.query('UPDATE referrals SET order_id = $1, reward_hg_coins = 10 WHERE id = $2', [orderId, referral.rows[0].id]);
      await this.pool.query('UPDATE wallets SET hg_coins = hg_coins + 10 WHERE user_id = $1', [referral.rows[0].referrer_id]);
    }
  }
}