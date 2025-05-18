import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class FavoritesMoviesService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async addFavorite(movieId: string, token: string) {
    let userId: string;
    const decoded = this.jwtService.verify(token);
    userId = decoded.user_id;
    const movie = await this.prisma.movie.findUnique({
      where: { id: movieId },
      select: { id: true, title: true },
    });
    if (!movie) throw new NotFoundException('Kino topilmadi');

    const favorite = await this.prisma.favorite.create({
      data: {
        userId,
        movieId,
      },
    });

    return {
      success: true,
      message: "Kino sevimlilar ro'yxatiga qo'shildi",
      data: {
        id: favorite.id,
        movie_id: movie.id,
        movie_title: movie.title,
        created_at: favorite.createdAt,
      },
    };
  }
  async getFavorites(token: string) {
    let userId: string;
    const decoded = this.jwtService.verify(token);
    userId = decoded.user_id;
    const favorites = await this.prisma.favorite.findMany({
      where: {
        userId,
      },
      include: {
        movie: true,
      },
    });

    const movies = favorites.map((fav) => ({
      id: fav.movie.id,
      title: fav.movie.title,
      slug: fav.movie.slug,
      poster_url: fav.movie.posterUrl,
      release_year: fav.movie.releaseYear,
      rating: Number(fav.movie.rating),
      subscription_type: fav.movie.subscriptionType,
    }));

    return {
      success: true,
      data: {
        movies,
        total: movies.length,
      },
    };
  }
  async removeFavorite(movieId: string, token: string) {
    let userId: string;
    const decoded = this.jwtService.verify(token);
    userId = decoded.user_id;

    const existingFavorite = await this.prisma.favorite.findFirst({
      where: {
        movieId,
        userId,
      },
    });

    if (!existingFavorite) {
      throw new NotFoundException('Bu kino sevimlilarda mavjud emas');
    }

    await this.prisma.favorite.delete({
      where: { id: existingFavorite.id },
    });

    return {
      success: true,
      message: "Kino sevimlilar ro'yxatidan o'chirildi",
    };
  }
}
