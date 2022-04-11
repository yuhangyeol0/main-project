import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class ProductMainCategory {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string

    @Column()
    @Field(() => String,{nullable:false})
    name!: string
}