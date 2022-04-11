import { Field, ObjectType } from '@nestjs/graphql';
import { Status_order } from 'src/apis/status/entities/status.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @JoinColumn()
  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinColumn()
  @ManyToOne(() => Status_order)
  @Field(() => Status_order)
  status: Status_order;
}
