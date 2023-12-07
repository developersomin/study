import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {ProductSalesLocation} from "../../productsSaleslocations/entities/productSaleslocation.entity";
import {ProductCategory} from "../../productsCategories/entities/productCategory.entity";
import {User} from "../../users/entities/user.entity";
import {ProductTag} from "../../productTags/entities/productTag.entity";
import {Field, Int, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    @Field(()=>String)
    id: string;

    @Column()
    @Field(()=>String)
    name: string;

    @Column()
    @Field(()=>String)
    description: string;

    @Column()
    @Field(()=>Int)
    price: number;

    @Column({default: false})//tinyint
    @Field(()=>Boolean)
    isSoldOut: boolean;

    @JoinColumn() // 1대1 일때 한곳에 중심을 잡기 위해 설정
    @OneToOne(() => ProductSalesLocation)
    @Field(()=>ProductSalesLocation)
    productSalesLocation: ProductSalesLocation;

    @ManyToOne(() => ProductCategory)
    @Field(()=>ProductCategory)
    productCategory: ProductCategory;

    @ManyToOne(() => User)
    @Field(()=>User)
    user: User;

    @JoinTable()
    @ManyToMany(()=>ProductTag,(productTags)=>productTags.products)
    @Field(()=>[ProductTag])
    productTags: ProductTag[];

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

}