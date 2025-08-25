import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async assignDefaultFreePlan(userId: number) {
    const existing = await this.prisma.subscription.findFirst({
      where: { userId, active: true },
    });

    if (!existing) {
      const startDate = new Date();
      const expiryDate = new Date();
      expiryDate.setMonth(startDate.getMonth() + 1);

      await this.prisma.subscription.create({
        data: { userId, planId: 1, startDate, expiryDate, active: true },
      });
    }
  }

  async addSubscription(userId: number, planId: number) {
    // Deactivate old subscriptions
    await this.prisma.subscription.updateMany({
      where: { userId, active: true },
      data: { active: false },
    });

    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setMonth(startDate.getMonth() + 1);

    return this.prisma.subscription.create({
      data: { userId, planId, startDate, expiryDate, active: true },
    });
  }

  async getUserPlan(userId: number) {
    const subscription = await this.prisma.subscription.findFirst({
      where: { userId, active: true },
    });

    if (!subscription) return null;

    if (new Date() > subscription.expiryDate) {
      await this.prisma.subscription.update({
        where: { id: subscription.id },
        data: { active: false },
      });
      return null;
    }

    return subscription;
  }
}
