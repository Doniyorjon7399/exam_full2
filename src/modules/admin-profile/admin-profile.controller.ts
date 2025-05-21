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
  UseGuards,
} from '@nestjs/common';
import { AdminProfileService } from './admin-profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';
import { UpdateMovieDto } from 'src/dtos/update-movie.dto';
import { UpdateRoleDto } from 'src/dtos/addorole.dto';
import { CreateMovieDto } from 'src/dtos/createMovie.dto';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('admin')
export class AdminProfileController {
  constructor(private readonly adminProfileService: AdminProfileService) {}
  @UseGuards(RoleGuard)
  @Get('movies')
  async getAllMovies() {
    return this.adminProfileService.getAllMovies();
  }
  @UseGuards(RoleGuard)
  @Post('movies')
  @UseInterceptors(FileInterceptor('poster', multerConfig))
  async createMovie(
    @Body() dto: CreateMovieDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    return this.adminProfileService.createMovie(dto, file, req);
  }
  @UseGuards(RoleGuard)
  @Put('movies/:movie_id')
  async updateMovie(
    @Param('movie_id') movieId: string,
    @Body() dto: UpdateMovieDto,
  ) {
    return this.adminProfileService.updateMovie(movieId, dto);
  }
  @UseGuards(RoleGuard)
  @Delete('movies/:movie_id')
  async deleteMovie(@Param('movie_id') movieId: string) {
    return this.adminProfileService.deleteMovie(movieId);
  }
  @UseGuards(RoleGuard)
  @Post('movies/:movie_id/files')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadMovieFile(
    @Param('movie_id') movieId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { quality: string; language: string },
  ) {
    return this.adminProfileService.uploadMovieFile(movieId, file, body);
  }
  @UseGuards(RoleGuard)
  @Patch('promote')
  async promoteToAdmin(@Body() dto: UpdateRoleDto) {
    return this.adminProfileService.promoteToAdmin(dto.userId);
  }
}
