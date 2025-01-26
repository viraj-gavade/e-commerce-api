import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';



@Injectable()
export class OrderService {
  constructor(private readonly PrismaService: PrismaService) {}
  create_Order(createOrderDto: CreateOrderDto) {
    const orderData: Prisma.OrderCreateInput = {
      user: {
        connect: { id: createOrderDto.userId },
      },
      totalPrice: createOrderDto.totalPrice,
      status: createOrderDto.status,
    };

    return this.PrismaService.order.create({
      data: orderData,
    });
  }
  

  findAll_Order() {
    return this.PrismaService.order.findMany()
  }

  findOne_Order(id: number) {
    return this.Pr;
  }

  update_Order(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove_Order(id: number) {
    return `This action removes a #${id} order`;
  }
}
