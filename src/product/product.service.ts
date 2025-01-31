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

 async findall__Products() {
    try {
      const products = await  this.PrismaService.product.findMany();
      if(products.length ===0){
        return {message:"No products found"};
      }
      return { message:"Products fetched successfully!",products}
    } catch (error) {
      console.log(error)
    }
  }

 async  findOne_Products(id: number) {
  try {
      const product = await  this.PrismaService.product.findUnique({where:{id}})
      if(!product){
        return {message:"Product not found"};
      }
      return { message:"Products fetched successfully!",product}
  } catch (error) {
    console.log(error)
  }

  }

  async update_Products(id: number, updateProductDto: UpdateProductDto) {
   try {
     const product = await  this.PrismaService.product.update({where:{id},data:updateProductDto})
     if(!product){
       return {message:"Product not found"};
     }
     return { message:"Product updated successfully!",product}
   } catch (error) {
    console.log(error)
   }
  }

  async remove_Products(id: number) {
   try {
     const product = await this.PrismaService.product.delete({where:{id}})
     if(!product){
       return {message:"Product not found"};
   }
   return { message:"Product deleted successfully!",product}
   } catch (error) {
    console.log(error)
   }

  }}