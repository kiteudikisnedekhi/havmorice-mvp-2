import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class CartService {
  private pool = new Pool({ connectionString: process.env.DATABASE_URL });

  async addToCart(userId: number, variantId: number, quantity: number, type: string) {
    // Check stock (assume stock column in product_variants)
    const variant = await this.pool.query('SELECT stock FROM product_variants WHERE id = $1', [variantId]);
    if (variant.rows[0].stock < quantity) throw new Error('Out of stock');

    // Get or create cart
    let cart = await this.pool.query('SELECT id FROM carts WHERE user_id = $1 AND type = $2', [userId, type]);
    if (cart.rows.length === 0) {
      cart = await this.pool.query('INSERT INTO carts (user_id, type) VALUES ($1, $2) RETURNING id', [userId, type]);
    }
    const cartId = cart.rows[0].id;

    // Add item
    await this.pool.query('INSERT INTO cart_items (cart_id, variant_id, quantity) VALUES ($1, $2, $3)', [cartId, variantId, quantity]);
    return { message: 'Added to cart' };
  }

  async removeFromCart(itemId: number) {
    await this.pool.query('DELETE FROM cart_items WHERE id = $1', [itemId]);
    return { message: 'Removed from cart' };
  }

  async getCarts(userId: number) {
    const carts = await this.pool.query('SELECT * FROM carts WHERE user_id = $1', [userId]);
    for (const cart of carts.rows) {
      cart.items = await this.pool.query('SELECT * FROM cart_items WHERE cart_id = $1', [cart.id]);
    }
    return carts.rows;
  }
}