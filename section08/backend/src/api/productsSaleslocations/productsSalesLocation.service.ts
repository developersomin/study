import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductSalesLocation} from "./entities/productSaleslocation.entity";
import {Repository} from "typeorm";

@Injectable()
export class ProductsSalesLocationService{
    constructor(@InjectRepository(ProductSalesLocation)
                private readonly productsSalesLocationRepository: Repository<ProductSalesLocation>
    ) {

    }

     create({productSalesLocation}){
        return this.productsSalesLocationRepository.save({
            ...productSalesLocation
        });


    }

}
