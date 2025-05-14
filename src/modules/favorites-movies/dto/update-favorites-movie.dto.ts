import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoritesMovieDto } from './create-favorites-movie.dto';

export class UpdateFavoritesMovieDto extends PartialType(CreateFavoritesMovieDto) {}
