import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
@Injectable()
export class MovieService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async getMovies(query: any) {
    const { page = 1, limit = 20, category, search, subscription_type } = query;

    const where: any = {};

    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }

    if (subscription_type) {
      where.subscriptionType = subscription_type;
    }

    if (category) {
      where.movieCategories = {
        some: {
          category: {
            name: { equals: category, mode: 'insensitive' },
          },
        },
      };
    }

    const skip = (page - 1) * limit;

    const [movies, total] = await Promise.all([
      this.prisma.movie.findMany({
        where,
        skip: +skip,
        take: +limit,
        select: {
          id: true,
          title: true,
          slug: true,
          posterUrl: true,
          releaseYear: true,
          rating: true,
          subscriptionType: true,
          movieCategories: {
            select: {
              category: { select: { name: true } },
            },
          },
        },
      }),
      this.prisma.movie.count({ where }),
    ]);

    const result = movies.map((m) => ({
      ...m,
      categories: m.movieCategories.map((mc) => mc.category.name),
    }));

    return {
      success: true,
      data: {
        movies: result,
        pagination: {
          total,
          page: +page,
          limit: +limit,
          pages: Math.ceil(total / limit),
        },
      },
    };
  }
  async getMovieBySlug(slug: string, token?: string) {
    let userId: string | null = null;

    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        userId = decoded.id;
      } catch {
        throw new UnauthorizedException('Token noto‘g‘ri yoki muddati tugagan');
      }
    }

    const movie = await this.prisma.movie.findUnique({
      where: { slug },
      include: {
        movieCategories: { include: { category: true } },
        files: true,
        reviews: true,
        favorites: userId ? { where: { userId } } : false,
      },
    });

    if (!movie) throw new NotFoundException('Movie topilmadi');

    return {
      success: true,
      data: movie,
    };
  }
}
