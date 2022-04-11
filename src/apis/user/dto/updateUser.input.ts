import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class updateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;

  @Field(() => Number)
  age: number;
}
