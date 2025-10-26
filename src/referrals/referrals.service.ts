import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class ReferralsService {
  private pool = new Pool({ connectionString: process.env.DATABASE_URL });

  async getRewards(userId: number) {
    const rewards = await this.pool.query('SELECT * FROM referrals WHERE referrer_id = $1', [userId]);
    return rewards.rows;
  }
}