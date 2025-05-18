import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { CreateProfileDto } from 'src/dtos/create-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async createProfile(createProfile: CreateProfileDto, token) {
    const { full_name, phone, country } = createProfile;
    const { user_id } = await this.jwt.verifyAsync(token);
    return this.prisma.profile.create({
      data: {
        fullName: full_name,
        phone,
        country,
        user: {
          connect: { id: user_id },
        },
      },
    });
  }
  async userProfile(token: string) {
    const { user_id } = await this.jwt.verifyAsync(token);

    const user = await this.prisma.profile.findUnique({
      where: { userId: user_id },
      select: {
        id: true,
        fullName: true,
        phone: true,
        country: true,
        createdAt: true,
        user: {
          select: {
            avatarUrl: true,
          },
        },
      },
    });

    return user;
  }
  async updateProfile(createProfile: CreateProfileDto, token: string) {
    const { full_name, phone, country } = createProfile;
    const { user_id } = await this.jwt.verifyAsync(token);

    const existingProfile = await this.prisma.profile.findFirst({
      where: { userId: user_id },
    });

    if (!existingProfile) {
      throw new NotFoundException('Profile not found');
    }

    const updatedProfile = await this.prisma.profile.update({
      where: { id: existingProfile.id },
      data: {
        fullName: full_name,
        phone,
        country,
      },
    });

    return {
      message: 'Profile updated successfully',
      data: updatedProfile,
    };
  }
}
