import {
  IsBoolean,
  IsNumber,
  IsInt,
  IsArray,
  IsString,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionPlanDto {
  @ApiProperty({ example: 'Premium', maxLength: 50 })
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: 9.99, type: Number })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({ example: 30, description: 'Subscription duration in days' })
  @Type(() => Number)
  @IsInt()
  durationDays: number;

  @ApiProperty({
    example: ['HD quality', 'No ads', 'Unlimited access'],
    description: 'List of features',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  features: string[];

  @ApiProperty({ example: true })
  @Type(() => Boolean)
  @IsBoolean()
  isActive: boolean;
}
