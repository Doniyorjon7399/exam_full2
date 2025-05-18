import { IsEmail, IsString } from 'class-validator';
export class CreateAuthDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
