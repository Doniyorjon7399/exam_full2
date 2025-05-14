import { Injectable } from '@nestjs/common';
import { CreateFavoritesMovieDto } from './dto/create-favorites-movie.dto';
import { UpdateFavoritesMovieDto } from './dto/update-favorites-movie.dto';

@Injectable()
export class FavoritesMoviesService {
  create(createFavoritesMovieDto: CreateFavoritesMovieDto) {
    return 'This action adds a new favoritesMovie';
  }

  findAll() {
    return `This action returns all favoritesMovies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favoritesMovie`;
  }

  update(id: number, updateFavoritesMovieDto: UpdateFavoritesMovieDto) {
    return `This action updates a #${id} favoritesMovie`;
  }

  remove(id: number) {
    return `This action removes a #${id} favoritesMovie`;
  }
}
