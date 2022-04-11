import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateUserInput } from '../dto/createUser.input';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({nullable:true})
  @Field(() => String)
  email: string;

  @Column({nullable:true})
  // @Field(() => String) 비밀번호 노출 금지 !
  password: string;

  @Column({nullable:true})
  @Field(() => String)
  name: string;

  @Column({nullable:true})
  @Field(() => Int)
  age: number;


  @Column({ default: 0 })
  @Field(() => Int)
  point: number;

  @DeleteDateColumn({nullable:true})
  deletedAt: Date;


}
