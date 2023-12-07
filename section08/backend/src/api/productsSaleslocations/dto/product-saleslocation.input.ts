import {InputType, OmitType} from "@nestjs/graphql";
import {ProductSalesLocation} from "../entities/productSaleslocation.entity";

@InputType()
export class ProductSalesLocationInput extends OmitType(ProductSalesLocation, ['id'], InputType) {


}