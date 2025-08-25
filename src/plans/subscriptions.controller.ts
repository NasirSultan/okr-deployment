import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PlansService } from './plans.service';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly plansService: PlansService,
    private readonly subscriptionsService: SubscriptionsService
  ) {}

  @Post()
  async subscribe(@Body() body: { userId: number; planId: number }) {
    const plan = this.plansService.getPlanById(body.planId);
    if (!plan) {
      return { message: 'Plan not found' };
    }

    const subscription = await this.subscriptionsService.addSubscription(
      body.userId,
      body.planId
    );

    return {
      message: 'Subscription created',
      plan: {
        id: plan.id,
        name: plan.name,
        price: plan.price,
        features: plan.features,
      },
    };
  }

  @Get(':userId/features')
  async getUserFeatures(@Param('userId') userId: string) {
    const id = Number(userId);

    // assign default free plan if no subscription exists
    await this.subscriptionsService.assignDefaultFreePlan(id);

    const subscription = await this.subscriptionsService.getUserPlan(id);
    if (!subscription) {
      return { message: 'No active subscription or subscription expired.' };
    }

    const plan = this.plansService.getPlanById(subscription.planId);

    if (!plan) {
      return { message: 'Plan not found' };
    }

    return {
      plan: plan.name,
      features: plan.features,
      message:
        subscription.planId === 1
          ? 'Free plan assigned by default for 1 month'
          : 'Active subscription',
    };
  }
}
