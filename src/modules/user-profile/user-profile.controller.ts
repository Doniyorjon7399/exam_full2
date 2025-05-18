import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Put,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { Request } from 'express';
import { CreateProfileDto } from 'src/dtos/create-profile.dto';

@Controller('profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}
  @Post()
  async createProfile(
    @Body() createProfile: CreateProfileDto,
    @Req() req: Request,
  ) {
    const token = req.cookies?.token;
    return await this.userProfileService.createProfile(createProfile, token);
  }
  @Get()
  async userProfile(@Req() req: Request) {
    const token = req.cookies?.token;
    return await this.userProfileService.userProfile(token);
  }
  @Put()
  async updateProfile(
    @Body() updateProfile: CreateProfileDto,
    @Req() req: Request,
  ) {
    const token = req.cookies?.token;

    return await this.userProfileService.updateProfile(updateProfile, token);
  }
}
