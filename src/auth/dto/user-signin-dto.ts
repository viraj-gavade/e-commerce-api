import { IsEmail,IsString,IsNotEmpty , MinLength, MaxLength} from "class-validator";

export class SignInUser_Dto {
    @IsString()
    @IsNotEmpty()
   @IsEmail()
    email : string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password : string


   


}