"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor() {
        this.pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
    }
    async sendOtp(phone) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);
        await this.pool.query('INSERT INTO otp_sessions (phone, otp_hash) VALUES ($1, $2) ON CONFLICT (phone) DO UPDATE SET otp_hash = $2', [phone, hashedOtp]);
        console.log(`OTP for ${phone}: ${otp}`);
        return { message: 'OTP sent' };
    }
    async verifyOtp(phone, otp, referralCode) {
        const result = await this.pool.query('SELECT otp_hash FROM otp_sessions WHERE phone = $1', [phone]);
        if (!result.rows.length || !(await bcrypt.compare(otp, result.rows[0].otp_hash))) {
            throw new Error('Invalid OTP');
        }
        let referrerId = null;
        if (referralCode) {
            const refResult = await this.pool.query('SELECT id FROM users WHERE referral_code = $1', [referralCode]);
            if (refResult.rows.length)
                referrerId = refResult.rows[0].id;
        }
        const userResult = await this.pool.query('INSERT INTO users (phone, referral_code) VALUES ($1, $2) ON CONFLICT (phone) DO UPDATE SET phone = EXCLUDED.phone RETURNING id, referral_code', [phone, `REF${Date.now()}`]);
        const userId = userResult.rows[0].id;
        if (referrerId && referrerId !== userId) {
            await this.pool.query('INSERT INTO referrals (referrer_id, beneficiary_id) VALUES ($1, $2)', [referrerId, userId]);
        }
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return { token, user: { id: userId, referralCode: userResult.rows[0].referral_code } };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map