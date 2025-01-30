import { IsEmail,IsString,IsNotEmpty , MinLength ,IsArray ,IsOptional} from "class-validator";

export class SignUpUser_Dto {
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    username : string

    @IsEmail()
    @IsNotEmpty()
    email : string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password : string

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