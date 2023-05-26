import { Args, Field, Mutation, ObjectType, Resolver } from "@nestjs/graphql";
import { CreateUserDTO, User } from "../users/user.model";
import { UserService } from "../users/user.service";
import { Query } from "@nestjs/common";
import { CustomUuidScalar } from "src/utils/custom";
import bcrypt from 'bcrypt';
import { AuthService } from "./auth.service";

@ObjectType()
export class AuthPayload {
  @Field()
  access_token: string;
}

@Resolver(of => AuthPayload)
export class AuthResolver {
  constructor(
    private authService: AuthService, 
  ) {}

  @Mutation(returns => AuthPayload)
  async login(
    @Args('username') username: string,
    @Args('password') password: string) {
    return await this.authService.login(username, password);
  }
}