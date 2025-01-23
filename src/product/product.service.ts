import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {

  constructor(private readonly PrismaService:PrismaService){}

  Create_Products(createProductDto: CreateProductDto) {
    return this.PrismaService.product.create({data:createProductDto})
  }

 findall__Products() {
    return this.PrismaService.product.findMany();
  }

  findOne_Products(id: number) {
    return this.PrismaService.product.findUnique({where:{id}})
  }

  update_Products(id: number, updateProductDto: UpdateProductDto) {
    return this.PrismaService.product.update({where:{id},data:updateProductDto})
  }

  remove_Products(id: number) {
    return this.PrismaService.product.delete({where:{id}})
  }
}
