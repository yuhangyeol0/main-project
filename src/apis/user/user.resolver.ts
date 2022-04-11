import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { updateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CreateUserInput } from './dto/createUser.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async fetchUsers() {
    return await this.userService.findAll();
  }

  @Query(() => User)
  async fetchUser(@Args('email') email: string) {
    return await this.userService.findOne({ email });
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput:CreateUserInput,
  ) {
    const {password, ...userinput} = createUserInput
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userService.create({  hashedPassword, ...userinput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  async fetchloginUser(@CurrentUser() currentUser: ICurrentUser) {
    return await this.userService.findOne({ email: currentUser.email });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: updateUserInput,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    const { email, ...user1} = currentUser
    const { password, ...update } = updateUserInput;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userService.update({
      email,
      hashedPassword,
      updateUserInput,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteUser(
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    const { email, ...user1} = currentUser
    return await this.userService.delete({ email });
  }
}
