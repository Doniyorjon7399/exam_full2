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
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}
  @Get('plans')
  async plans(@Req() res: Request) {
    const token = res.cookies?.token;
    return await this.subscriptionService.plans(token);
  }
  @Post('purchase')
  async purchase(@Body() dto: PurchaseSubscriptionDto, @Req() res: Request) {
    const token = res.cookies?.token;
    return await this.subscriptionService.purchase(dto, token);
  }
}
