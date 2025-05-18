import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { AddReviewDto } from 'src/dtos/add-review.dto';

@Injectable()
export class CommentsService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async addReview(movieId: string, dto: AddReviewDto, token: string) {
    const decoded = this.jwtService.verify(token);
    const userId = decoded.user_id;
    const movie = await this.prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      throw new NotFoundException('Bunday kino topilmadi');
    }
    const review = await this.prisma.review.create({
      data: {
        movieId,
        userId,
        rating: dto.rating,
        comment: dto.comment ?? '',
      },
      include: { user: { select: { id: true, username: true } } },
    });

    return {
      success: true,
      message: 'Sharh muvaffaqiyatli qoshildi',
      data: review,
    };
  }
  async deleteReview(reviewId: string, token: string) {
    const decoded = this.jwtService.verify(token);
    const userId = decoded.user_id;

    const existingReview = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      throw new NotFoundException('Sharh topilmadi');
    }

    if (existingReview.userId !== userId) {
      throw new ForbiddenException('Bu sharhni ochirish huquqiga ega emassiz');
    }

    await this.prisma.review.delete({
      where: { id: reviewId },
    });

    return {
      success: true,
      message: 'Sharh muvaffaqiyatli ochirildi',
    };
  }
}
