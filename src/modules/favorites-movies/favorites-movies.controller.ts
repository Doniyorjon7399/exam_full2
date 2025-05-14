import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoritesMoviesService } from './favorites-movies.service';
import { CreateFavoritesMovieDto } from './dto/create-favorites-movie.dto';
import { UpdateFavoritesMovieDto } from './dto/update-favorites-movie.dto';

@Controller('favorites-movies')
export class FavoritesMoviesController {
  constructor(private readonly favoritesMoviesService: FavoritesMoviesService) {}

  @Post()
  create(@Body() createFavoritesMovieDto: CreateFavoritesMovieDto) {
    return this.favoritesMoviesService.create(createFavoritesMovieDto);
  }

  @Get()
  findAll() {
    return this.favoritesMoviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritesMoviesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavoritesMovieDto: UpdateFavoritesMovieDto) {
    return this.favoritesMoviesService.update(+id, updateFavoritesMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritesMoviesService.remove(+id);
  }
}
