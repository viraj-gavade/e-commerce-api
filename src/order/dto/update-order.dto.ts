
import { IsNumber,IsArray,IsString } from "class-validator";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateOrderItemDto } from "src/order-item/dto/create-order-item.dto";
export class UpdateOrderDto {
  
    @IsNumber()
    totalPrice: number;
  
    @IsString()
    status: string;



}
