import { Body, Controller,Delete,Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('user')
export class UserController {
    constructor(private readonly UserService:UserService){}

  
    @Get()
    async find_all_users(){
        return this.UserService.getAllUsers()
    }

    
    @Get()
    async find_single_user(@Param() user_id: number){
        return this.UserService.getSingleUser(user_id)
    }
    
    
    @Delete()
    async delete_user(@Param() user_id: number){
        return this.UserService.deleteUser(user_id)

    }

    @Patch()
    async update_user(@Param() user_id: number, @Body() UpdateUserDto:UpdateUserDto){
        return this.UserService.updateUser(user_id, UpdateUserDto)
    }
}
