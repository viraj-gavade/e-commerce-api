import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto{

    @IsString()
    @IsNotEmpty()
    firstName:string


    @IsString()
    @IsNotEmpty()
    lastName:string

    @IsString()
    @IsNotEmpty()
    phone:string
    @IsString()
    
    @IsNotEmpty()
    address:string

}