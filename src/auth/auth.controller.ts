import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { phone: string }) {
    return this.authService.sendOtp(body.phone);
  }

  @Post('verify')
  async verify(@Body() body: { phone: string; otp: string; referralCode?: string }) {
    return this.authService.verifyOtp(body.phone, body.otp, body.referralCode);
  }
}