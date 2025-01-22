import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  create_Order(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
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
