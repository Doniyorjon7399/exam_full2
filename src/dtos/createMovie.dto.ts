import { IsArray, IsString, IsUUID, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum SubscriptionType {
  FREE = 'free',
  PREMIUM = 'premium',
}

export class CreateMovieDto {
  @ApiProperty({ example: 'Some Movie Title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'This is a description of the movie.' })
  @IsString()
  description: string;

  @ApiProperty({ example: 2023 })
  @Type(() => Number)
  @IsNumber()
  release_year: number;

  @ApiProperty({ example: 120 })
  @Type(() => Number)
  @IsNumber()
  duration_minutes: number;

  @ApiProperty({ example: SubscriptionType.FREE, enum: SubscriptionType })
  @IsEnum(SubscriptionType)
  subscription_type: SubscriptionType;

  @IsString()
  category_ids: string;
}
