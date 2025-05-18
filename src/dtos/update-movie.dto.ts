export class UpdateMovieDto {
  title: string;
  description: string;
  subscription_type: string;
  category_ids?: string[];
}
