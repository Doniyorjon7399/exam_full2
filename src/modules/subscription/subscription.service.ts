import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/database/prisma.service';
import { CreateSubscriptionPlanDto } from 'src/dtos/CreateSubscriptionPlan.Dto';
import { PurchaseSubscriptionDto } from 'src/dtos/purchase-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async plans(token: string) {
    const plans = await this.prisma.subscriptionPlan.findMany({});

    return plans;
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
    const existsSubscription = await this.prisma.userSubscription.findFirst({
      where: { userId: user_id },
    });
    if (existsSubscription && existsSubscription.planId == dto.plan_id)
      throw new BadGatewayException('Subscription already success ');
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
    const paynet = await this.prisma.payment.create({
      data: {
        userSubscriptionId: subscription.id,
        amount: plan.price,
        paymentMethod: dto.payment_method,
        paymentDetails: dto.payment_details,
        status: 'completed',
        externalTransactionId: 'TRX1234567890',
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
        paynet,
      },
    };
  }
  async plansCreate(dto: CreateSubscriptionPlanDto, token: string) {
    const plans = await this.prisma.subscriptionPlan.create({
      data: {
        name: dto.name,
        price: dto.price,
        durationDays: dto.durationDays,
        features: dto.features,
        isActive: dto.isActive,
      },
    });

    return plans;
  }
}
