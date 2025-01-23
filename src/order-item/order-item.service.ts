import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderItemService {
  constructor(private readonly PrismaService:PrismaService){}
  create_orderItem(createOrderItemDto: CreateOrderItemDto) {
    return this.PrismaService.orderItem.create({data:createOrderItemDto})
  }

  findAll_orderItem() {
    return this.PrismaService.orderItem.findMany()
  }

  findOne_orderItem(id: number) {
    return this.PrismaService.orderItem.findUnique({where:{id}})
  }

  update_orderItem(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return this.PrismaService.orderItem.update({where:{id},data:updateOrderItemDto})
  }

  remove_orderItem(id: number) {
    return this.PrismaService.orderItem.delete({where:{id}})
  }
}
