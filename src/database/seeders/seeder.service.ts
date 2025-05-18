import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Role } from '@prisma/client';
import bcrypt from 'bcrypt';
@Injectable()
export class SeederServica implements OnModuleInit {
  constructor(private prisma: PrismaService) {}
  private admin_username: string = process.env.SUPER_ADMIN_USERNAME as string;
  private admin_password: string = process.env.SUPER_ADMIN_PASSWORD as string;
  private admin_email: string = process.env.SUPER_ADMIN_EMAIL as string;

  async onModuleInit() {
    try {
      const admin = await this.prisma.user.findUnique({
        where: {
          username: this.admin_username,
        },
      });

      if (!admin) {
        const passwordHash = await bcrypt.hash(this.admin_password, 10);
        await this.prisma.user.create({
          data: {
            username: this.admin_username,
            passwordHash: passwordHash,
            email: this.admin_email,
            role: Role.superadmin,
          },
        });
        console.log('superadmin added');
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}
