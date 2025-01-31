import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly PrismaServices:PrismaService){}
  async Create_Categories(createCategoryDto: CreateCategoryDto) {
  try {
      const category = await  this.PrismaServices.category.create({data:{
        name:createCategoryDto.name,
        description:createCategoryDto.description,
        parentId:createCategoryDto.parentId
      }})
      return {category:category,message:"Category Created Successfully"};
  } catch (error) {
    console.log('Something went wrong while creating the category',error)
  }

  }

 async findAll_Categories() {
  try {
     const categories = await this.PrismaServices.category.findMany({where:{parentId:null}})
     if(categories.length===0){
      return {message:"No categories found"};
     }
     return categories
  } catch (error) {
    console.log('Something went wrong while fetching the categories',error)
    
  }
  }

 async findOne_Categories(id: number) {
   try {
     const category = await this.PrismaServices.category.findUnique({where:{id:id}}) 
     if(!category){
       return {message:"Category not found"};
     }
     return category
   } catch (error) {
    console.log(error)
   }
  }

 async update_Categories(id: number, updateCategoryDto: UpdateCategoryDto) {
   try {
     const category = await this.PrismaServices.category.update({where:{id},data:updateCategoryDto})
     if(!category){
       return {message:"Category not found"};
 
     }
     return { category, message: "Category Updated Successfully"};
   } catch (error) {
    console.log(error)
   }
  }

  async remove_Categories(id: number) {
  try {
      const category = await this.PrismaServices.category.delete({where:{id}})
      if(!category){
        return {message:"Category not found"};
      }
      return {category, message: "Category Deleted Successfully"};
  } catch (error) {
    console.log(error)
  }
  }
}
