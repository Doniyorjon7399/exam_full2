import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  subscription_type: string;

  @IsOptional()
  @IsString({ each: true })
  category_ids?: string[];
}
