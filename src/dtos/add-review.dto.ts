import { IsIn, IsOptional, IsString } from 'class-validator';

export class AddReviewDto {
  @IsIn([1, 2, 3, 4, 5, 6], { message: 'Rating 1 dan 5 gacha bolishi kerak' })
  rating: number;

  @IsString()
  @IsOptional()
  comment?: string;
}
