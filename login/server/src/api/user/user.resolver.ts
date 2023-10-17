import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthAccessGuard } from '../auth/guards/gql-auth.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  findOneByEmail(@Args('email') email: string) {
    return this.userService.findOneByEmail({ email });
  }
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchUser(): string {
    console.log('인가에 성공하였습니다');
    return '인가에 성공하였습니다.';
  }

  @Mutation(() => User)
  createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args({ name: 'age', type: () => Int }) age: number,
  ) {
    return this.userService.create({ email, password, name, age });
  }
}
