import { IsNotEmpty, IsString, Length } from 'class-validator';

export class addCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  name: string;
  @IsNotEmpty()
  @Length(3, 20)
  @IsString()
  slug: string;
  @IsNotEmpty()
  @Length(10, 100)
  @IsString()
  description: string;
}
