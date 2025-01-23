import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly PrismaServices:PrismaService){}
  async Create_Categories(createCategoryDto: CreateCategoryDto) {
    return this.PrismaServices.category.create({data:{
      name:createCategoryDto.name,
      description:createCategoryDto.description,
      parentId:createCategoryDto.parentId
    }})

  }

  findAll_Categories() {
   return this.PrismaServices.category.findMany({where:{parentId:null}})
  }

  findOne_Categories(id: number) {
    return this.PrismaServices.category.findUnique({where:{id}})
  }

  update_Categories(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.PrismaServices.category.update({where:{id},data:updateCategoryDto})
  }

  remove_Categories(id: number) {
    return this.PrismaServices.category.delete({where:{id}})
  }
}
