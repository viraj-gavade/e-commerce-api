import { Body, Controller,Delete,Get, Param, Patch, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { AuthenticatedRequest  } from 'src/auth/auth.middleware';
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly UserService:UserService){}

  
    @Get('/panel')
    async find_all_users(){
        return this.UserService.getAllUsers()
    }

    @Get('my-profile')
    async get_user_profile(@Req() req:AuthenticatedRequest){
        return this.UserService.getUserProfile(req)
    }
    @Get('my-orders')
    async get_user_orders(@Req() req:AuthenticatedRequest){
        return this.UserService.getUserOrders(req)
    }
    @Get('my-orders/:orderId')
    async get_user_single_order(@Param('orderId') orderId:string,@Req() req:AuthenticatedRequest){
        return this.UserService.getUserSingleOrder(req,+orderId)
    }

    // @Delete('my-orders/:orderId')
    // async delete_user_single_order(@Param('orderId') orderId:string,@Req() req:AuthenticatedRequest){
    //     return this.UserService.DeleteUserSingleOrder(req,+orderId)
    // }

    
    @Get('panel/:id')
    async find_single_user(@Param('id') user_id: number){
        return this.UserService.getSingleUser(user_id)
    }
    
    
    @Delete('panel/:id')
    async delete_user(@Param() user_id: number){
        return this.UserService.deleteUser(user_id)

    }

    @Patch('panel/:id')
    async update_user(@Param() user_id: number, @Body() UpdateUserDto:UpdateUserDto){
        return this.UserService.updateUser(user_id, UpdateUserDto)
    }
}
