import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    process.env.JWT_SECRET = 'test_secret';  // Set for tests
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should send OTP', async () => {
    const mockQuery = jest.fn().mockResolvedValue({ rows: [] });
    jest.spyOn(service['pool'], 'query').mockImplementation(mockQuery);

    const result = await service.sendOtp('+911234567890');
    expect(result.message).toBe('OTP sent');
    expect(mockQuery).toHaveBeenCalled();
  });

  it('should verify OTP and create user', async () => {
    const mockQuery = jest.fn()
      .mockResolvedValueOnce({ rows: [{ otp_hash: await require('bcrypt').hash('123456', 10) }] })
      .mockResolvedValueOnce({ rows: [{ id: 1, referral_code: 'REF123' }] });
    jest.spyOn(service['pool'], 'query').mockImplementation(mockQuery);

    const result = await service.verifyOtp('+911234567890', '123456');
    expect(result.token).toBeDefined();
    expect(result.user).toBeDefined();
  });
});