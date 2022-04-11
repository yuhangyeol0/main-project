import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/product/entities/product.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => [String], { nullable: true })
  url?: string;

  @Column({ nullable: true })
  @Field(() => Boolean, { nullable: true })
  isImage?: boolean;

  @JoinColumn()
  @ManyToOne(() => Product)
  @Field(() => Product, { nullable: true })
  product?: Product;

  @DeleteDateColumn()
  deletedAt?: Date;
}
