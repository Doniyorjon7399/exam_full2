import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AddReviewDto } from 'src/dtos/add-review.dto';
@Controller('movies')
export class CommentsController {
  constructor(private readonly reviewsService: CommentsService) {}
  @Post(':movie_id/reviews')
  async addReview(
    @Param('movie_id') movieId: string,
    @Body() dto: AddReviewDto,
    @Req() req: any,
  ) {
    const token = req.cookies?.token;
    return this.reviewsService.addReview(movieId, dto, token);
  }
  @Delete(':movie_id/reviews/:review_id')
  async deleteReview(@Param('review_id') reviewId: string, @Req() req: any) {
    const token = req.cookies?.token;
    if (!token) {
      throw new UnauthorizedException('Token topilmadi');
    }
    return this.reviewsService.deleteReview(reviewId, token);
  }
}
