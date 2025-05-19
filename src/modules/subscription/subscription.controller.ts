import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { Request } from 'express';
import { PurchaseSubscriptionDto } from 'src/dtos/purchase-subscription.dto';
import { CreateSubscriptionPlanDto } from 'src/dtos/CreateSubscriptionPlan.Dto';
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}
  @Get('plans')
  async plans(@Req() req: Request) {
    const token = req.cookies?.token;
    return await this.subscriptionService.plans(token);
  }
  @Post('purchase')
  async purchase(@Body() dto: PurchaseSubscriptionDto, @Req() req: Request) {
    const token = req.cookies?.token;
    return await this.subscriptionService.purchase(dto, token);
  }
  @Post('plans/create')
  async plansCreate(
    @Body() dto: CreateSubscriptionPlanDto,
    @Req() req: Request,
  ) {
    const token = req.cookies?.token;
    return await this.subscriptionService.plansCreate(dto, token);
  }
}
