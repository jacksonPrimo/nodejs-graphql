import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CustomerModel {
  @Field(() => String) 
  id: String;

  @Field(() => String) 
  name: string;
}