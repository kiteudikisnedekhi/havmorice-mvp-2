import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CatalogModule } from './catalog/catalog.module';
import { CartModule } from './cart/cart.module';
import { PaymentsModule } from './payments/payments.module';
import { ReferralsModule } from './referrals/referrals.module';
import { DeliveryModule } from './delivery/delivery.module';
import { OperationsModule } from './operations/operations.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

@Module({
  imports: [AuthModule, CatalogModule, CartModule, PaymentsModule, ReferralsModule, DeliveryModule, OperationsModule, SubscriptionsModule],
})
export class AppModule {}