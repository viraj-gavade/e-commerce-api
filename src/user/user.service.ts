import { Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { AuthenticatedRequest } from 'src/auth/auth.middleware';


@Injectable()
export class UserService {
    constructor(private readonly PrismaService: PrismaService) {}


    async getUserProfile(@Req() req:AuthenticatedRequest ){
        const {UserId} = req.user
   
        return this.PrismaService.user.findUnique({where:{id:UserId}})
    }
    async getSingleUser(user_id:number){
        console.log(user_id)
        return this.PrismaService.user.findUnique({where:{id:user_id}})
    }

    async getAllUsers(){
        return this.PrismaService.user.findMany({})
    }

    async deleteUser(user_id:number){
        return this.PrismaService.user.delete({where:{id:user_id}})
    }
    async updateUser(user_id:number,UpdateUserDto:UpdateUserDto){
        return this.PrismaService.user.update({where:{id:user_id},data:UpdateUserDto}
        )
    }

    async getUserOrders(@Req() req:AuthenticatedRequest ){
        const {UserId} = req.user
   
        return this.PrismaService.order.findMany({where:{userId:UserId}})
    }

}
