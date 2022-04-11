import { Field, ObjectType } from "@nestjs/graphql";
import { ProductMainCategory } from "src/apis/mainCategory/entities/productSubCategory.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class ProductSubCategory {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string

    @Column()
    @Field(() => String,{nullable:false})
    name!: string

    @JoinColumn()
    @ManyToOne(()=> ProductMainCategory)
    @Field(() => ProductMainCategory)
    productMainCategory: ProductMainCategory
}