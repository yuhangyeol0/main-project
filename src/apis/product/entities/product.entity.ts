import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Allergy } from 'src/apis/allergy/entities/allergy.entity';
import { Image } from 'src/apis/image/entities/image.entity';
import { Payment } from 'src/apis/payment/entities/payment.entity';
import { ProductSubCategory } from 'src/apis/subCategory/entities/productSubCategory.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String, { nullable: false })
  name!: string;

  @Column()
  @Field(() => String, { nullable: true })
  description?: string;

  // @JoinTable() //상품테이블이 메인이라 여기에 조인함
  // @ManyToMany(() => Allergy, (allergy) => allergy.products) //서로 지정 productTag.entity랑 다대다관계임
  // @Field(() => [Allergy])
  // allergys: Allergy[];

  @JoinColumn()
  @ManyToOne(() => ProductSubCategory, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => ProductSubCategory)
  productSubCategory: ProductSubCategory;

  @Column({ default: 0 })
  @Field(() => Int)
  price?: number;

  @Column({ default: 0 })
  @Field(() => Int)
  size: string;

  @Column({ default: 0 })
  @Field(() => Int)
  amount: number;

  @Column({ default: 0 })
  @Field(() => Int)
  kcal: number;

  @Column({ default: 0 })
  @Field(() => Int)
  protein: number;

  @Column({ default: 0 })
  @Field(() => Int)
  fat: number;

  @Column({ nullable: true })
  @Field(() => Int)
  caffein: number;

  @JoinColumn()
  @ManyToOne(() => Payment)
  @Field(() => Payment)
  payments: Payment;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
