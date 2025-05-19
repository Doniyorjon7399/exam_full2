import { IsUUID, IsEnum, IsBoolean, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@prisma/client';

export class PurchaseSubscriptionDto {
  @ApiProperty()
  @IsUUID()
  plan_id: string;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @ApiProperty()
  @IsBoolean()
  auto_renew: boolean;

  @ApiProperty({
    example: {
      card_number: '4242XXXXXXXX4242',
      expiry: '04/26',
      card_holder: 'ALIJON VALIYEV',
    },
    description: 'Card info or other simple payment data',
  })
  @IsObject()
  payment_details: Record<string, any>;
}
