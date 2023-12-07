import {HttpException, HttpStatus, Injectable, UnprocessableEntityException} from "@nestjs/common";
import {CreateProductInput} from "./dto/create-product.input";
import {In, Repository} from "typeorm";
import {Product} from "./entities/product.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {
    IProductsServiceCheckSoldOut,
    IProductsServiceCreate, IProductsServiceDelete,
    IProductsServiceFindOne,
    IProductsServiceUpdate
} from "./interface/products-service.interface";
import {ProductsSalesLocationService} from "../productsSaleslocations/productsSalesLocation.service";
import {ProductsTagsService} from "../productTags/productsTags.service";


@Injectable()
export class  ProductsService{
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository : Repository<Product>,
        private readonly productsSalesLocationService: ProductsSalesLocationService,
        private readonly productsTagsService: ProductsTagsService) {
    }
    async create({ createProductInput} : IProductsServiceCreate): Promise<Product>{
       /*
        const result = this.productsRepository.save({
            ...createProductInput,
        });
*/
        const {productSalesLocation,productCategoryId, productTags,...product} = createProductInput;
        const result = await this.productsSalesLocationService.create({productSalesLocation});

        const tagNames = productTags.map(el => el.replace('#', ''));
        const prevTags = await this.productsTagsService.findByNames({tagNames});

        const temp = [];
        tagNames.forEach(el=>{
            const isExists = prevTags.find(prevEl => el === prevEl.name);
            if(!isExists){
                temp.push({name: el});
            }
        })

        const newTags = await this.productsTagsService.bulkInsert({names: temp});
        const tags = [...prevTags,...newTags.identifiers]

        const result2 = this.productsRepository.save({
            ...product,
            productSalesLocation: result,
            productCategory: {
                id: productCategoryId,
            },
            productTags: tags,
        });
        return result2;
    }
    findAll():Promise<Product[]>{
        return this.productsRepository.find({relations: ['productSalesLocation','productCategory']});
    }
    findOne({productId}:IProductsServiceFindOne):Promise<Product>{
        return this.productsRepository.findOne({where: {id: productId}, relations:['productSalesLocation','productCategory']});
    }

    async update({productId,updateProductInput}:IProductsServiceUpdate){
        const product = await this.findOne({productId});

        this.checkSoldOut({product});
/*

        //숙제1 왜 에러가 발생하는지!
        const result = this.productsRepository.save({
            ...product, // 수정 후 수정되지 않은 다른 결과값 까지 모두 객체로 돌려 받고 싶을
            ...updateProductInput,
        });
*/

        //return result;
    }

    checkSoldOut({product}:IProductsServiceCheckSoldOut):void{
        if(product.isSoldOut) {
            //throw new HttpException("이미 판매된 상품", HttpStatus.UNPROCESSABLE_ENTITY);
            throw new UnprocessableEntityException("이미 판매 완료된 상품");
        }
    }

    async delete({productId}:IProductsServiceDelete):Promise<boolean> {
        /*
        //1.실제 삭제
        const result = await this.productsRepository.delete({id: productId});
        return result.affected ? true : false;

        //2.소프트 삭제 - isDeleted 직접구현
        this.productsRepository.update({id: productId}, {isDeleted: true});

        //3.소프트 삭제 - deletedAt 직접구현
        this.productsRepository.update({id: productId}, {deletedAt: new Date()});

        //4. typeORM 제공 softRemove
        this.productsRepository.softRemove({id:productId});   //딘잠: id 로만 삭제 가능
                                                                    //장점: 여러 ID 한번에 지우기 가능
        */
        //5. typeORM 제공 softDelete
        const result = await this.productsRepository.softDelete({id:productId});  //딘잠: 여러 ID 한번에 지우기 불가능
                                                                                                        //장점: 다른 컬럼으로도 삭제 가능
        return result.affected ? true : false;
    }

}