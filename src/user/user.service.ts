import { All, Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { AuthenticatedRequest } from 'src/auth/auth.middleware';



@Injectable()
export class UserService {
    constructor(private readonly PrismaService: PrismaService) {}


    async getUserProfile(@Req() req:AuthenticatedRequest ){
       try {
         const {UserId} = req.user
         const user =  this.PrismaService.user.findUnique({where:{id:UserId}})
         if(!user){
             return {message:'User not found',status:404}
         }
         return user
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

    async getUserOrders(@Req() req:AuthenticatedRequest ){
    try {
            const {UserId} = req.user
       
            const userOrders = await this.PrismaService.order.findMany({where:{userId:UserId}})
            if(userOrders.length === 0){
                return {message:"No orders found",status:404}
            }
            return userOrders
    } catch (error) {
        console.log(error)
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

    // async DeleteUserSingleOrder(@Req() req:AuthenticatedRequest,orderId:number ){
    //     const order = await this.getUserSingleOrder(req,orderId)
    //     console.log(order)
    //     if(!order){
    //         return {message:"Order not found",status:404}
    //     }
    //     await this.PrismaService.order.delete({where:{id:order.id}})
    // }

}
