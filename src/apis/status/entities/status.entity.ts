import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum STATUS_OF_ORDER {
  PAYMENT = 'PAYMENT',
  PREPARING = 'PREPARING',
  READY = 'READY',
}

registerEnumType(STATUS_OF_ORDER, { name: 'STATUS_OF_ORDER' });

@Entity()
@ObjectType()
export class Status_order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'enum', enum: STATUS_OF_ORDER })
  @Field(() => STATUS_OF_ORDER)
  status: STATUS_OF_ORDER;
}
