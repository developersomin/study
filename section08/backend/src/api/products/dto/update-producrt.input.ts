import {InputType, OmitType, PartialType, PickType} from "@nestjs/graphql";
import {CreateProductInput} from "./create-product.input";

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {

}

/*
PickType(CreateProductInput,['name','price']); //뽑기
OmitType(CreateProductInput,['description']); // 빼기
PartialType(CreateProductInput); // 물음표(있어도 되고 없어도 됨)*/
