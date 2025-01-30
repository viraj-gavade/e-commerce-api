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

    @Get('profile')
    async get_user_profile(@Req() req:AuthenticatedRequest){
        return this.UserService.getUserProfile(req)
    }
    @Get('my-orders')
    async get_user_orders(@Req() req:AuthenticatedRequest){
        return this.UserService.getUserOrders(req)
    }

    
    @Get('panel/:id')
    async find_single_user(@Param() user_id: number){
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
