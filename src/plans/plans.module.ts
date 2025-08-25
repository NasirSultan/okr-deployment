import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { PrismaService } from '../lib/prisma/prisma.service';

@Module({
  controllers: [PlansController, SubscriptionsController],
  providers: [PlansService, SubscriptionsService, PrismaService],
})
export class PlansModule {}
