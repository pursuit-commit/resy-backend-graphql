import { ObjectType, Field, Int, InputType } from "@nestjs/graphql";
import { Restaurant } from "src/restaurants/restaurant.model";
import { CustomUuidScalar } from "src/utils/custom";

// export type CreateUserDTO = { name: string, username: string, password: string } 
 
@InputType()
export class CreateUserDTO {
  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  password: string
}

@ObjectType()
export class User {
  @Field(type => CustomUuidScalar)
  id: string;

  @Field()
  username: string;

  @Field()
  name: string;

  @Field()
  passwordHash: string;
}