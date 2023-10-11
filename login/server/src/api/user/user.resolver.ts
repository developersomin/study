import {Args, Int, Mutation, Resolver} from "@nestjs/graphql";
import {UserService} from "./user.service";

@Resolver()
export class UserResolver{
  constructor(
      private readonly userService: UserService
  ) {
  }


  @Mutation()
  createUser(
      @Args('email') email: string,
      @Args('password') password: string,
      @Args('name') name: string,
      @Args({name: 'age', type: ()=>Int}) age: number
  ){
    return this.userService.create({email,password,name, age})
  }
}
