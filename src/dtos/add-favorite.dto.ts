import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddFavoriteDto {
  @IsUUID()
  movie_id: string;
}
