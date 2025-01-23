import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('add')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.Create_Products(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findall__Products();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne_Products(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update_Products(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove_Products(+id);
  }
}
