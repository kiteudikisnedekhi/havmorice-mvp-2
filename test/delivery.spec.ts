import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryService } from '../src/delivery/delivery.service';

describe('DeliveryService', () => {
  let service: DeliveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryService],
    }).compile();

    service = module.get<DeliveryService>(DeliveryService);
  });

  it('should update delivery', async () => {
    const mockQuery = jest.fn().mockResolvedValue({});
    jest.spyOn(service['pool'], 'query').mockImplementation(mockQuery);

    const result = await service.updateDelivery(1, { lat: 12.34, lng: 56.78 }, 'photo.jpg');
    expect(result.message).toBe('Delivery updated');
  });
});