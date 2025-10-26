import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private pool = new Pool({ connectionString: process.env.DATABASE_URL });

  async sendOtp(phone: string): Promise<{ message: string }> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    await this.pool.query('INSERT INTO otp_sessions (phone, otp_hash) VALUES ($1, $2) ON CONFLICT (phone) DO UPDATE SET otp_hash = $2', [phone, hashedOtp]);
    console.log(`OTP for ${phone}: ${otp}`);
    return { message: 'OTP sent' };
  }

  async verifyOtp(phone: string, otp: string, referralCode?: string): Promise<{ token: string; user: any }> {
    const result = await this.pool.query('SELECT otp_hash FROM otp_sessions WHERE phone = $1', [phone]);
    if (!result.rows.length || !(await bcrypt.compare(otp, result.rows[0].otp_hash))) {
      throw new Error('Invalid OTP');
    }

    let referrerId = null;
    if (referralCode) {
      const refResult = await this.pool.query('SELECT id FROM users WHERE referral_code = $1', [referralCode]);
      if (refResult.rows.length) referrerId = refResult.rows[0].id;
    }

    const userResult = await this.pool.query(
      'INSERT INTO users (phone, referral_code) VALUES ($1, $2) ON CONFLICT (phone) DO UPDATE SET phone = EXCLUDED.phone RETURNING id, referral_code',
      [phone, `REF${Date.now()}`]
    );
    const userId = userResult.rows[0].id;

    if (referrerId && referrerId !== userId) {
      await this.pool.query('INSERT INTO referrals (referrer_id, beneficiary_id) VALUES ($1, $2)', [referrerId, userId]);
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return { token, user: { id: userId, referralCode: userResult.rows[0].referral_code } };
  }
}