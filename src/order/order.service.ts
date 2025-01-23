import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly PrismaService: PrismaService) {}
  create_Order(createOrderDto: CreateOrderDto) {
    return this.PrismaService.order.create({data:createOrderDto})
  }

  findAll_Order() {
    return `This action returns all order`;
  }

  findOne_Order(id: number) {
    return `This action returns a #${id} order`;
  }

  update_Order(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove_Order(id: number) {
    return `This action removes a #${id} order`;
  }
}
