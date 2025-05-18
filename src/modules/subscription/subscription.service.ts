import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PaymentMethod } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { PurchaseSubscriptionDto } from 'src/dtos/purchase-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async plans(token: string) {
    const { user_id } = await this.jwt.verifyAsync(token);

    const userSubscription = await this.prisma.userSubscription.findFirst({
      where: { userId: user_id },
      include: {
        plan: true,
      },
    });
    return userSubscription;
  }
  async purchase(dto: PurchaseSubscriptionDto, token: string) {
    const { user_id } = await this.jwt.verifyAsync(token);
    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: { id: dto.plan_id },
    });

    if (!plan) throw new NotFoundException('Plan not found');

    const now = new Date();
    const endDate = new Date(now);
    endDate.setMonth(endDate.getMonth() + 1);

    const subscription = await this.prisma.userSubscription.create({
      data: {
        userId: user_id,
        planId: plan.id,
        startDate: now,
        endDate,
        autoRenew: dto.auto_renew,
        status: 'active',
      },
      include: {
        plan: true,
      },
    });

    return {
      success: true,
      message: 'Subscription successfully purchased',
      data: {
        subscription: {
          id: subscription.id,
          plan: {
            id: plan.id,
            name: plan.name,
          },
          start_date: subscription.startDate,
          end_date: subscription.endDate,
          status: subscription.status,
          auto_renew: subscription.autoRenew,
        },
      },
    };
  }
}
