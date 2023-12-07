import {Injectable} from "@nestjs/common";
import {In, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductCategory} from "../productsCategories/entities/productCategory.entity";
import {ProductTag} from "./entities/productTag.entity";

@Injectable()
export class ProductsTagsService{

    constructor(
        @InjectRepository(ProductTag)
        private readonly productsTagsRepository: Repository<ProductTag>,) {
    }
    findByNames({tagNames}: IProductsTagsServiceFindByNames){
        return this.productsTagsRepository.find({where: {name: In(tagNames)}});
    }

    bulkInsert({names}: IProductsTagsServiceBulkInsert){
        return this.productsTagsRepository.insert(names);
    }
}