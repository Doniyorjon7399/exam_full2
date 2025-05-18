import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  UnauthorizedException,
  ForbiddenException,
  Put,
} from '@nestjs/common';
import { AdminProfileService } from './admin-profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';
import { CreateMovieDto } from 'src/dtos/create-movie.dto';
import { UpdateMovieDto } from 'src/dtos/update-movie.dto';
import { UpdateRoleDto } from 'src/dtos/addorole.dto';

@Controller('admin')
export class AdminProfileController {
  constructor(private readonly adminProfileService: AdminProfileService) {}
  @Get('movies')
  async getAllMovies(@Req() req: Request) {
    return this.adminProfileService.getAllMovies(req);
  }
  @Post('movies')
  @UseInterceptors(FileInterceptor('poster', multerConfig))
  async createMovie(
    @Body() dto: CreateMovieDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    return this.adminProfileService.createMovie(dto, file, req);
  }
  @Put('movies/:movie_id')
  async updateMovie(
    @Param('movie_id') movieId: string,
    @Body() dto: UpdateMovieDto,
    @Req() req: Request,
  ) {
    return this.adminProfileService.updateMovie(movieId, dto, req);
  }
  @Delete('movies/:movie_id')
  async deleteMovie(@Param('movie_id') movieId: string, @Req() req: Request) {
    return this.adminProfileService.deleteMovie(movieId, req);
  }
  @Post('movies/:movie_id/files')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadMovieFile(
    @Param('movie_id') movieId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { quality: string; language: string },
    @Req() req: Request,
  ) {
    return this.adminProfileService.uploadMovieFile(movieId, file, body, req);
  }
  @Patch('promote')
  async promoteToAdmin(@Body() dto: UpdateRoleDto) {
    return this.adminProfileService.promoteToAdmin(dto.userId);
  }
}
