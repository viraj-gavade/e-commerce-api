import { Controller,Post,Body ,Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUser_Dto } from './dto/user-signin-dto';
import { SignUpUser_Dto } from './dto/user-signup-dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly AuthServices : AuthService) {}
    @Post('register')
    register_user(@Body() SignUpUser_Dto:SignUpUser_Dto ,
    @Res({ passthrough: true }) response: any, ){
        return this.AuthServices.SignUpUser(SignUpUser_Dto.username,SignUpUser_Dto.email,SignUpUser_Dto.password)
    }

    @Post('login')
    login_user(@Body() SignInUser_Dto:SignInUser_Dto,
    @Res({ passthrough: true }) response: any
){
        return this.AuthServices.SignInUser(SignInUser_Dto.username,SignInUser_Dto.password,response)
    }
}