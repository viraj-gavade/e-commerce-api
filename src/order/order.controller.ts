import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';


@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create_Order(createOrderDto);
  }

  @Get('panel')
  findAll() {
    return this.orderService.findAll_Order();
  }

  @Get('panel/:id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne_Order(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.orderService.update_Order(+id, updateOrderDto);
  // }

  @Delete('panel/:id')
  remove(@Param('id') id: string) {
    return this.orderService.remove_Order(+id);
  }
}
