import { IsString, IsInt, IsArray, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMovieDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @Type(() => Number)
  @IsInt()
  release_year: number;
  @Type(() => Number)
  @IsInt()
  duration_minutes: number;
  @IsString()
  subscription_type: string;
  // @IsArray()
  // // @IsUUID('4', { each: true })
  // // @IsOptional()
  // category_ids: string[];
}
