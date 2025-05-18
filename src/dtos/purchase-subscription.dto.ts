import { IsUUID, IsString, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PaymentDetailsDto {
  @IsString()
  card_number: string;

  @IsString()
  expiry: string;

  @IsString()
  card_holder: string;
}

export class PurchaseSubscriptionDto {
  @IsUUID()
  plan_id: string;

  @IsString()
  payment_method: string;

  @IsBoolean()
  auto_renew: boolean;

  @ValidateNested()
  @Type(() => PaymentDetailsDto)
  payment_details: PaymentDetailsDto;
}
