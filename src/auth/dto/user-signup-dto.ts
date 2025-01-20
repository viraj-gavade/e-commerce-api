import { IsEmail,IsString,IsNotEmpty , MinLength} from "class-validator";

export class SignUpUser_Dto {
    @IsString
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
}