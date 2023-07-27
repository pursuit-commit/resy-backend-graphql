import { Args, Field, Mutation, ObjectType, Resolver } from "@nestjs/graphql";
import { CreateUserDTO, User } from "./user.model";
import { UserService } from "./user.service";
import { AuthPayload } from "../auth/auth.resolver";


@Resolver(of => User)
export class UsersResolver {
  constructor(
    private userService: UserService,
  ) { }

  @Mutation(returns => AuthPayload)
  async signUp(@Args({ name: 'userData', type: () => CreateUserDTO }) userData: CreateUserDTO) {
    return await this.userService.createUser(userData);
  }
}