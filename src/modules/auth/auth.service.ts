import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateAuthDto } from 'src/dtos/create-auth.dto';
import { UpdateAuthDto } from 'src/dtos/update-auth.dto';
import { PrismaService } from 'src/database/prisma.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from 'src/dtos/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    const { username, email, password } = createAuthDto;
    const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) throw new ConflictException('User already exists');
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });
    return {
      success: true,
      data: user,
      message: 'User created You have successfully registered',
    };
  }
  async login(loginAuthDto: loginDto) {
    const { email, password } = loginAuthDto;
    const existingEmail = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!existingEmail) throw new ConflictException('User not found');
    const isPassword = await bcrypt.compare(
      password,
      existingEmail.passwordHash!,
    );
    if (!isPassword) throw new BadRequestException('invalid password');
    const token = this.jwtService.sign({ user_id: existingEmail.id });
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        role: true,
        subscriptions: {
          select: {
            id: true,
            plan: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });

    return {
      token,
      success: true,
      data: user,
      message: 'User created Login successfully',
    };
  }
}
