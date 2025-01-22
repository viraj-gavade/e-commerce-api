import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user-dto';


@Injectable()
export class UserService {
    constructor(private readonly PrismaService: PrismaService) {}


    async getSingleUser(user_id:number){
        return this.PrismaService.user.findUnique({where:{id:user_id}})
    }

    async getAllUsers(){
        return this.PrismaService.user.findMany()
    }

    async deleteUser(user_id:number){
        return this.PrismaService.user.delete({where:{id:user_id}})
    }
    async updateUser(user_id:number,UpdateUserDto:UpdateUserDto){
        return this.PrismaService.user.update({where:{id:user_id},data:UpdateUserDto}
        )
    }

}
