import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthenticatedRequest } from 'src/auth/auth.middleware';


@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Req() req:AuthenticatedRequest ,@Body() createOrderDto: CreateOrderDto) {
   try {
     const order = await this.orderService.create_Order(req,createOrderDto);
     if(!order){
       return {message: 'Order not created', status: 400}
     }
     return {message:"Orders created sucessfully!",order}; 
   } catch (error) {
    console.log(error)
   }
   }

  @Get('panel')
  async findAll() {
  try {
      const orders = await this.orderService.findAll_Order();
      if(orders.length ===0){
        return { message:"No orders found!"}
      }
      return {message:"Orders fetched sucessfully!",orders};
  } catch (error) {
    console.log(error)
  }
  }

  @Get('panel/:id')
 async  findOne(@Param('id') id: string) {
    try {
      const order = await this.orderService.findOne_Order(+id);
      if(!order){
        return {message: 'Order not found', status: 404}
      }
      return {message:"Order fetched sucessfully!",order};
    } catch (error) {
      console.log(error)
    }
  }

  @Patch('panel/:id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
   try {
     const order = await this.orderService.update_Order(+id, updateOrderDto);
     if(!order){
       return {message: 'Order not updated', status: 400}
     }
     return {message:"Order updated sucessfully!",order};
   } catch (error) {
    console.log(error)
   }
  }

  @Delete('panel/:id')
  async remove(@Param('id') id: string) {
   try {
     const order = await this.orderService.remove_Order(+id); 
     if(!order){
       return {message: 'Order not found', status: 404}
     }
     return {message:"Order deleted sucessfully!"};
   } catch (error) {
    console.log(error)
   }
  }
}
