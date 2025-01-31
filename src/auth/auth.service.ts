import { Injectable,Body } from '@nestjs/common';
import { PrismaService  } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Role } from 'src/common/enums/roles.enums';
import { SignUpUser_Dto } from './dto/user-signup-dto';

@Injectable()
export class AuthService {
    constructor(private readonly prisma : PrismaService,private readonly JwtService:JwtService){}

    async SignUpUser(SignUpUser_Dto:SignUpUser_Dto){
        const { username,email,password,address,firstName,lastName,phone,role } = SignUpUser_Dto
        const HashedPassword = await bcrypt.hash(password,10)
        const User = await this.prisma.user.create(
            {
                data:{
                   username,
                   email,
                   password:HashedPassword,
                   address,
                   firstName,
                   lastName,
                   phone,
                   role

                }
            }
        )
        return User
    }

    async SignInUser(email:string,password:string,response:any){
       const User = await this.prisma.user.findUnique({where:{email}})
        if (!User) {
            return response.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, User.password);
        if (!isPasswordCorrect) {
            return response.status(401).json({ message: 'Invalid email or password' });
        }
        const payload = {UserId:User.id, username : User.username,role:User.role}
        const acccessToken = this.JwtService.sign(payload)
        response.cookie('access_token', acccessToken);
   
        return {
            message: 'Login successfully!',
        }
    }

    async SignOutUser(response:Response){
        response.clearCookie('access_token');
   
        return {
            message: 'Logged Out  successfully!',
        }
    }
}
