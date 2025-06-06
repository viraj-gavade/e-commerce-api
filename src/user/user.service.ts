import { All, Injectable, Req,Param, Body } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { AuthenticatedRequest } from 'src/auth/auth.middleware';




@Injectable()
export class UserService {
    constructor(private readonly PrismaService: PrismaService) {}


    async getUserProfile(@Req() req:AuthenticatedRequest ){
       try {
         const {UserId} = req.user
         const user =  this.PrismaService.user.findUnique({where:{id:UserId},select:{
            id:true,
            username:true,
            email:true,
            firstName:true,
            lastName:true,
            role:true,
            address:true,
            phone:true
         }})
         if(!user){
             return {message:'User not found',status:404}
         }
         return user
       } catch (error) {
        console.log(error)
       }
    }

    async UpdateUserProfile(@Req() req:AuthenticatedRequest, @Body() UpdateUserDto:UpdateUserDto ){
        try {
          const {UserId} = req.user
          const user =  await this.PrismaService.user.update({where:{id:UserId},data:UpdateUserDto})
          if(!user){
              return {message:'User not found',status:404}
          }
          return {user,message:"User update successfully!"}
        } catch (error) {
         console.log(error)
        }
     }
 

    async getSingleUser(user_id:number){
        try {
            const user = await this.PrismaService.user.findUnique({where:{id:user_id}}) 
            if(!user){
                return {message:"user not  found",status:404}
            }
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async getAllUsers(){
       try {
         const AllUsers = await  this.PrismaService.user.findMany({})
         if(AllUsers.length === 0){
             return {message:"No users found",status:404}
         }
         return AllUsers
       } catch (error) {
        console.log(error)
       }
    }

    async deleteUser(user_id:number){
      try {
          const user = await  this.PrismaService.user.delete({where:{id:user_id}})
          if(!user){
              return {message:"User not found",status:404}
          }
          return { message:"User deleted successfully",status:200}
      } catch (error) {
        console.log(error)
      }
    }



    async updateUser(user_id:number,UpdateUserDto:UpdateUserDto){
       try {
         const user = await  this.PrismaService.user.update({where:{id:user_id},data:UpdateUserDto})
             if(!user){
                 return {message:"User not found",status:404}
             }
             return {message:"User updated successfully",status:200}
       } catch (error) {
        console.log(error)
       }
        
    }

    async getUserOrders(@Req() req: AuthenticatedRequest) {
        try {
            const { UserId } = req.user;
    
            const userOrders = await this.PrismaService.order.findMany({ where: { userId: UserId } });
    
            if (userOrders.length === 0) {
                return { message: "No orders found", status: 404 };
            }
    
            // Fetch order items for each order
            const orderItemsPromises = userOrders.map(async (order) => {
                return this.PrismaService.orderItem.findMany({ where: { orderId: order.id } });
            });
    
            const orderItems = await Promise.all(orderItemsPromises);
    
            // Combine the orders with their items
            const ordersWithItems = userOrders.map((order, index) => ({
                ...order,
                items: orderItems[index],
            }));
    
            return ordersWithItems;
        } catch (error) {
            console.log(error);
            return { message: "An error occurred", status: 500 };
        }
    }
    

    async getUserSingleOrder(@Req() req:AuthenticatedRequest,orderId:number ){
        try {
       const {UserId} = req.user
    
         const userOrder =  await this.PrismaService.order.findFirst({
             where: {
                 userId: UserId, // Filter by authenticated user's UserId
                 id: orderId,    // Filter by the provided orderId
             },
         });
         if(!userOrder){
             return {message:"Order not found",status:404}
         }
         return userOrder
   } catch (error) {
    console.log(error)
   }
    }

    async DeleteSingleOrder(@Req() req: AuthenticatedRequest, @Param() orderId: number) {
        try {
            const { UserId } = req.user;
            const userOrder = await this.PrismaService.order.findUnique({ where: { id: orderId, userId: UserId } });
    
            if (!userOrder) {
                return { message: "Order not found or you don't have permission to delete this order", status: 404 };
            }
            await this.PrismaService.orderItem.deleteMany({ where: { orderId } }); // Delete related order items
            await this.PrismaService.order.delete({ where: { id: orderId } }); // Delete the order
    
            return { message: "Order deleted successfully", status: 200 };
        } catch (error) {
            console.log(error);
            return { message: "An error occurred", status: 500 };
        }
    }
    

    async DeleteOrderItem(@Req() req: AuthenticatedRequest, @Param() orderItemId: number) {
        try {
            const { UserId } = req.user;
    
            // Check if the order item belongs to the authenticated user
            const orderItem = await this.PrismaService.orderItem.findUnique({
                where: { id: orderItemId },
                include: { order: true }, // Include order details to check userId
            });
    
            if (!orderItem || orderItem.order.userId !== UserId) {
                return { message: "Order item not found or you don't have permission to delete this item", status: 404 };
            }
    
            // Delete the order item
            await this.PrismaService.orderItem.delete({ where: { id: orderItemId } });
    
            return { message: "Order item deleted successfully", status: 200 };
        } catch (error) {
            console.log(error);
            return { message: "An error occurred", status: 500 };
        }
    }
    

}
