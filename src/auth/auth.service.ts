import { Injectable,Body } from '@nestjs/common';
import { PrismaService  } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma : PrismaService,private readonly JwtService:JwtService){}

    async SignUpUser(username:string,email:string,password:string){
        const HashedPassword = await bcrypt.hash(password,10)
        const User = await this.prisma.user.create(
            {
                data:{
                   username,
                   email,
                   password:HashedPassword
                }
            }
        )
        return User
    }

    async SignInUser(username:string,password:string,response:any){
        const User = await this.prisma.user.findUnique(
            {
                where:{
                    username:username
                }
            }
        )
        if (!User) {
            return response.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, User.password);
        console.log(isPasswordCorrect)
        if (!isPasswordCorrect) {
            return response.status(401).json({ message: 'Invalid email or password' });
        }
        const payload = {UserId:User.id, username : User.username}
        const acccessToken = this.JwtService.sign(payload)
        response.cookie('access_token', acccessToken);
   
        return {
            message: 'Login successfully!',
        }
    }
}
