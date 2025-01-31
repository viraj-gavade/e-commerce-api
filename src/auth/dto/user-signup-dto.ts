import { IsEmail,IsString,IsNotEmpty , MinLength ,IsArray ,IsOptional ,IsEnum} from "class-validator";
import { Role } from "src/common/enums/roles.enums";
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

    @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}