import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { addCategoryDto } from 'src/dtos/add-category.dto';

@Controller('admin/movies')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('category')
  async category(@Body() data: addCategoryDto, @Req() req: any) {
    const token = req.cookies?.token;
    return await this.categoryService.category(data, token);
  }
}
