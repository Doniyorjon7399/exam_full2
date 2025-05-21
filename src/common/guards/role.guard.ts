import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token } = request.cookies;
    const { user_id } = await this.jwt.verifyAsync(token);
    const user = await this.prisma.user.findFirst({
      where: { id: user_id },
    });
    if (!user) throw new UnauthorizedException('Foydalanuvchi aniqlanmadi');
    if (user.role !== 'admin' && user.role !== 'superadmin')
      throw new ForbiddenException('Faqat adminlar uchun ruxsat');
    return true;
  }
}
