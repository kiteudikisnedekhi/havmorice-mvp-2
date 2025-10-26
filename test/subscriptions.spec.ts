import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsService } from '../src/subscriptions/subscriptions.service';

describe('SubscriptionsService', () => {
  let service: SubscriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionsService],
    }).compile();

    service = module.get<SubscriptionsService>(SubscriptionsService);
  });

  it('should create subscription', async () => {
    const mockQuery = jest.fn().mockResolvedValue({});
    jest.spyOn(service['pool'], 'query').mockImplementation(mockQuery);

    const result = await service.createSubscription(1, 1, 'weekly');
    expect(result.message).toBe('Subscription created');
  });
});