import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

  Create_Products(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

 findall__Products() {
    return `This action returns all product`;
  }

  findOne_Products(id: number) {
    return `This action returns a #${id} product`;
  }

  update_Products(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove_Products(id: number) {
    return `This action removes a #${id} product`;
  }
}
