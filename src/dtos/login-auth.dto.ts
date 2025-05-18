import { IsEmail, IsEmpty, IsString } from 'class-validator';

export class loginDto {
  @IsEmail()
  // @IsEmpty()
  email: string;
  @IsString()
  // @IsEmpty()
  password: string;
}
