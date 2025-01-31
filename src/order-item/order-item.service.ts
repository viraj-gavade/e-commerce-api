import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderItemService {
  constructor(private readonly PrismaService:PrismaService){}
  async create_orderItem(createOrderItemDto: CreateOrderItemDto) {
    try {
      const { orderId, productId, quantity,price } = createOrderItemDto;
      const orderItem = await  this.PrismaService.orderItem.create({data:{
        orderId,
        productId,
        quantity,
        price
      }})
      if(!orderItem){
        return {message:' order items not created',status:401}
      }
      return {orderItem,message:"Order items created successfully",status:201}
    } catch (error) {
      console.log(error)
    }
  }

  async findAll_orderItem() {
    try {
      const orderItems = await this.PrismaService.orderItem.findMany()
      if(orderItems.length === 0){
        return {message:'No order items found',status:404}
      }
      return {orderItems,message:"Order items fetched successfully",status:201}
    } catch (error) {
      console.log(error)
    }
  }

  async findOne_orderItem(id: number) {
   try {
     const orderItem = await this.PrismaService.orderItem.findUnique({where:{id}})
     if(!orderItem){
       return {message:'No order items found',status:404}
     }
     return {orderItem,message:"Order item fetched successfully",status:201}
   } catch (error) {
    console.log(error)
   }
  }

  async update_orderItem(id: number, updateOrderItemDto: UpdateOrderItemDto) {
   try {
     const { quantity,price } = updateOrderItemDto;
     const orderItem = await this.PrismaService.orderItem.update({where:{id},data:{
       quantity,
       price
     }})
     if(!orderItem){
       return {message:'No order items found',status:404}
     }
     return {orderItem,message:"Order items updated successfully",status:201}
   } catch (error) {
    console.log(error)
   }
  }

  async remove_orderItem(id: number) {
   try {
     const orderItem = await this.PrismaService.orderItem.delete({where:{id}})
     if(!orderItem){
       return {message:'No order items found',status:404}
     }
     return {orderItem,message:"Order items deleted successfully",status:201}
   } catch (error) {
    console.log(error)
   }
  }
}
