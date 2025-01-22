import { Controller,Post,Body ,Res, Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUser_Dto } from './dto/user-signin-dto';
import { SignUpUser_Dto } from './dto/user-signup-dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly AuthServices : AuthService) {}
    @Post('register')
  async  register_user(@Body() SignUpUser_Dto:SignUpUser_Dto ,
    @Res({ passthrough: true }) response: any, ){
        return this.AuthServices.SignUpUser(SignUpUser_Dto.username,SignUpUser_Dto.email,SignUpUser_Dto.password,SignUpUser_Dto.address,SignUpUser_Dto.firstName,SignUpUser_Dto.lastName,SignUpUser_Dto.phone)
    }

    @Post('login')
   async  login_user(@Body() SignInUser_Dto:SignInUser_Dto,
    @Res({ passthrough: true }) response: any
){
        return this.AuthServices.SignInUser(SignInUser_Dto.email,SignInUser_Dto.password,response)
    }

    @Get('logout')
    async logout_user(@Res() response: Response) {
        const user = await this.AuthServices.SignOutUser(response)
        return response.status(200).json(user)
    }
   
}