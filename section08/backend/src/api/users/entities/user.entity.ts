import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class User{

    @PrimaryGeneratedColumn('uuid')
    @Field(()=>String)
    id: string;

    @Column()
    @Field(()=>String)
    name: string;

    @Column()
    @Field(()=>String)
    email: string;

    @Column()
    @Field(()=>String)
    password: string;

    @Column()
    @Field(()=>Int)
    age: number;

    @Column({default: 0})
    @Field(() => Int)
    point: number;

}