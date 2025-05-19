import { IsString } from 'class-validator';

export class addCategoryDto {
  @IsString()
  name: string;
  @IsString()
  slug: string;
  @IsString()
  description: string;
}
