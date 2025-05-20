import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, SubscriptionType } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
interface FindMoviesParams {
  page: number;
  limit: number;
  category?: string;
  search?: string;
  subscription_type?: string;
}
@Injectable()
export class MovieService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async findMovies(search?: string) {
    const where: any = {};

    if (search) {
      where.title = {
        contains: search,
        mode: 'insensitive',
      };
    }

    const movies = await this.prisma.movie.findMany({
      where,
      include: {
        movieCategories: {
          include: {
            category: true,
          },
        },
      },
    });

    return movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      slug: movie.slug,
      poster_url: movie.posterUrl,
      release_year: movie.releaseYear,
      rating: movie.rating,
      subscription_type: movie.subscriptionType,
      categories: movie.movieCategories.map((mc) => mc.category.name),
    }));
  }

  async getMovieBySlug(slug: string, token?: string) {
    let userId: string | null = null;

    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        userId = decoded.id;
      } catch {
        throw new UnauthorizedException('Token notogri yoki muddati tugagan');
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
