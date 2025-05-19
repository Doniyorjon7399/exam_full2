import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { addCategoryDto } from 'src/dtos/add-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async category(data: addCategoryDto, token: string) {
    const { user_id } = await this.jwt.verifyAsync(token);

    const isAdmin = await this.prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!isAdmin || !['admin', 'superadmin'].includes(isAdmin.role)) {
      throw new ForbiddenException(
        'Faqat admin foydalanuvchilar kategoriya qoshishi mumkin',
      );
    }
    const existsCategory = await this.prisma.category.findFirst({
      where: { name: data.name },
    });
    if (existsCategory)
      throw new BadRequestException(
        `kategoriya allaqachon qoshilgan categoryid:${existsCategory.id}`,
      );
    const category = await this.prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
      },
    });

    return {
      success: true,
      message: 'Kategoriya muvaffaqiyatli qoshildi',
      data: category,
    };
  }
}
