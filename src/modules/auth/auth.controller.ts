import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SetMetadata,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from 'src/dtos/create-auth.dto';
import isPublic from 'src/common/decorators/is_public.decarator';
import { loginDto } from 'src/dtos/login-auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @isPublic(true)
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.create(createAuthDto);
  }
  @Post('login')
  @isPublic(true)
  async login(
    @Body() loginAuthDto: loginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.login(loginAuthDto);
    res.cookie('token', data.token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return data;
  }
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { message: 'Successfully logged out' };
  }
}
