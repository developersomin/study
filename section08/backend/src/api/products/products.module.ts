import {Module} from "@nestjs/common";
import {ProductsResolver} from "./products.resolver";
import {ProductsService} from "./products.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "./entities/product.entity";
import {ProductsSalesLocationService} from "../productsSaleslocations/productsSalesLocation.service";
import {ProductSalesLocation} from "../productsSaleslocations/entities/productSaleslocation.entity";
import {ProductsTagsService} from "../productTags/productsTags.service";
import {ProductTag} from "../productTags/entities/productTag.entity";


@Module({
    imports:[
        TypeOrmModule.forFeature([
            Product,
            ProductSalesLocation,
            ProductTag,
        ])
    ],
    providers: [
        ProductsResolver,
        ProductsService,
        ProductsSalesLocationService,
        ProductsTagsService,
    ]
})
export class ProductsModule{

}