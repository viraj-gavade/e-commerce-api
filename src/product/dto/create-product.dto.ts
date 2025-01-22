import { CreateOrderItemDto } from "src/order-item/dto/create-order-item.dto"

export class CreateProductDto {

  name:string

  description:string

  price : number

  stock : number

  categoryId : number

  orderItem : CreateOrderItemDto[]


}
