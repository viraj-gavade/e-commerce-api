
import { IsNumber,IsArray,IsString } from "class-validator";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateOrderItemDto } from "src/order-item/dto/create-order-item.dto";
export class CreateOrderDto {

    @IsNumber()
    userId: number;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    orderItems: CreateOrderItemDto[];
  
    @IsNumber()
    totalPrice: number;
  
    @IsString()
    status: string;



}
