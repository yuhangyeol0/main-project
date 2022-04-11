import { Int, Field, InputType, ObjectType } from '@nestjs/graphql';
import { Allergy } from 'src/apis/allergy/entities/allergy.entity';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  productSubCategoryId: string;

  @Field(() => [String])
  productAllergy: string[];

  @Field(() => Int)
  price: number;
}
