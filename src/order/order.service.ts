import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { AuthenticatedRequest } from 'src/auth/auth.middleware';
import { Req } from '@nestjs/common';


@Injectable()
export class OrderService {
  constructor(private readonly PrismaService: PrismaService) {}
  create_Order(@Req() req:AuthenticatedRequest,createOrderDto: CreateOrderDto) {
    const { UserId } = req.user;
    const { totalPrice , status} = createOrderDto
   return this.PrismaService.order.create({data:{
    totalPrice:totalPrice,
    status:status,
    userId:UserId
   }})
  }
  

  findAll_Order() {
    return this.PrismaService.order.findMany()
  }

  findOne_Order(id: number) {
    return this.PrismaService.order.findUnique({where:{id:id}});
  }

  update_Order(id: number, updateOrderDto: UpdateOrderDto) {
    const { status,totalPrice } = updateOrderDto;
    return this.PrismaService.order.update({where:{id},data:{
      status:status,
      totalPrice:totalPrice
    }})
  }

  remove_Order(id: number) {
    return `This action removes a #${id} order`;
  }
}
