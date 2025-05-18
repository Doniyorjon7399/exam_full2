import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty({ message: 'Full name is required' })
  @IsString({ message: 'Full name must be a string' })
  full_name: string;

  @IsNotEmpty({ message: 'Phone is required' })
  @Matches(/^\+998\d{9}$/, {
    message: 'Phone must be in format +998901234567',
  })
  phone: string;

  @IsNotEmpty({ message: 'Country is required' })
  @IsString({ message: 'Country must be a string' })
  country: string;
}
