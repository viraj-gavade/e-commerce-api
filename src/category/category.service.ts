import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly PrismaServices:PrismaService){}
  async Create_Categories(createCategoryDto: CreateCategoryDto) {
    return `This action returns add  all category`;

  }

  findAll_Categories() {
    return `This action returns all category`;
  }

  findOne_Categories(id: number) {
    return `This action returns a #${id} category`;
  }

  update_Categories(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove_Categories(id: number) {
    return `This action removes a #${id} category`;
  }
}
