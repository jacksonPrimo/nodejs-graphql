import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserModel {
  @Field(() => String) 
  id: String;

  @Field(() => String) 
  name: string;

  @Field(() => String) 
  email: string;

  @Field(() => Date) 
  createdAt: Date;
}