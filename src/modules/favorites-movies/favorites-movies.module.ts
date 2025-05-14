import { Module } from '@nestjs/common';
import { FavoritesMoviesService } from './favorites-movies.service';
import { FavoritesMoviesController } from './favorites-movies.controller';

@Module({
  controllers: [FavoritesMoviesController],
  providers: [FavoritesMoviesService],
})
export class FavoritesMoviesModule {}
