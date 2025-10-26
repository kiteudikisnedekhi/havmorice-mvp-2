import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from '../src/payments/payments.service';

// Mock Razorpay at the top
jest.mock('razorpay', () => {
  return {
    default: jest.fn().mockImplementation(() => ({
      orders: {
        create: jest.fn().mockResolvedValue({ id: 'order_123' }),
      },
    })),
  };
});

describe('PaymentsService', () => {
  let service: PaymentsService;

  beforeEach(async () => {
    process.env.RAZORPAY_KEY_ID = 'test_key';
    process.env.RAZORPAY_KEY_SECRET = 'test_secret';
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsService],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should process checkout', async () => {
    // Mock the entire pool.query to return expected values
    jest.spyOn(service['pool'], 'query').mockImplementation((query: string) => {
      if (query.includes('SELECT * FROM carts')) {
        return Promise.resolve({ rows: [{ id: 1, user_id: 1 }] });
      } else if (query.includes('SELECT * FROM cart_items')) {
        return Promise.resolve({ rows: [{ variant_id: 1, quantity: 1 }] });
      } else if (query.includes('SELECT price_modifier')) {
        return Promise.resolve({ rows: [{ price_modifier: 10 }] });
      } else if (query.includes('SELECT balance')) {
        return Promise.resolve({ rows: [{ balance: 200, hg_coins: 0 }] });
      } else if (query.includes('INSERT INTO orders')) {
        return Promise.resolve({ rows: [{ id: 1 }] });
      } else if (query.includes('SELECT referrer_id')) {
        return Promise.resolve({ rows: [] });
      }
      return Promise.resolve({ rows: [] });
    });

    const result = await service.checkout(1, 1, 'wallet');
    expect(result.message).toBe('Payment successful');
  });
});