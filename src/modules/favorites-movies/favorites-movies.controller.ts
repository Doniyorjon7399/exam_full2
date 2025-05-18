import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { FavoritesMoviesService } from './favorites-movies.service';
import { AddFavoriteDto } from 'src/dtos/add-favorite.dto';

@Controller('favorites')
export class FavoritesMoviesController {
  constructor(
    private readonly favoritesMoviesService: FavoritesMoviesService,
  ) {}
  @Post()
  async addFavorite(@Body() dto: AddFavoriteDto, @Req() req: any) {
    const token = req.cookies?.token;
    console.log(dto);
    return this.favoritesMoviesService.addFavorite(dto.movie_id, token);
  }
  @Get()
  async getFavorites(@Req() req: any) {
    const token = req.cookies?.token;
    return this.favoritesMoviesService.getFavorites(token);
  }
  @Delete(':movie_id')
  async removeFavorite(@Param('movie_id') movieId: string, @Req() req: any) {
    const token = req.cookies?.token;
    return this.favoritesMoviesService.removeFavorite(movieId, token);
  }
}
