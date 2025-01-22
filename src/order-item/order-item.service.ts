import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemService {
  create_orderItem(createOrderItemDto: CreateOrderItemDto) {
    return 'This action adds a new orderItem';
  }

  findAll_orderItem() {
    return `This action returns all orderItem`;
  }

  findOne_orderItem(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update_orderItem(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove_orderItem(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
