import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Request } from 'express';
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  @Get()
  @Get()
  async getMovies(@Query('search') search?: string) {
    const movies = await this.movieService.findMovies(search);
    return {
      success: true,
      data: {
        movies,
      },
    };
  }

  @Get(':slug')
  async getMovieBySlug(@Param('slug') slug: string, @Req() req: Request) {
    const token = req.cookies?.token;
    return this.movieService.getMovieBySlug(slug, token);
  }
}
