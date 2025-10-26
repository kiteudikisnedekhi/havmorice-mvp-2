import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class CatalogService {
  private pool = new Pool({ connectionString: process.env.DATABASE_URL });

  async getProducts() {
    const result = await this.pool.query('SELECT * FROM products');
    return result.rows;
  }

  async getProduct(id: number, distance: number = 0, floor: number = 0) {
    const product = await this.pool.query('SELECT * FROM products WHERE id = $1', [id]);
    const variants = await this.pool.query('SELECT * FROM product_variants WHERE product_id = $1', [id]);
    const fee = this.calculateFee(product.rows[0].delivery_fee_base, distance, floor);
    return { ...product.rows[0], variants, deliveryFee: fee };
  }

  private calculateFee(baseFee: number, distance: number, floor: number): number {
    const freeKm = 2; // Configurable
    const extraKmCharge = 5; // Configurable
    const floorCharge = 10; // Configurable
    return baseFee + Math.max(0, distance - freeKm) * extraKmCharge + floor * floorCharge;
  }
}