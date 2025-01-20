import { IsEmail,IsString,IsNotEmpty , MinLength} from "class-validator";

export class SignInUser_Dto {
    @IsString
    @IsNotEmpty()
    @MinLength(8)
    username : string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password : string
}