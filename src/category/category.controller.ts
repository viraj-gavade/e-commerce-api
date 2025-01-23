import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('add')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.Create_Categories(createCategoryDto);
  }

  @Get('')
  findAll() {
    return this.categoryService.findAll_Categories()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne_Categories(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update_Categories(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove_Categories(+id);
  }
}
