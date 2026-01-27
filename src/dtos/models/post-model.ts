import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PostModel {
  @Field(() => String) 
  id: String;

  @Field(() => String) 
  title: string;

  @Field(() => String) 
  content: string;

  @Field(() => String) 
  ownerId: string;

  @Field(() => Date) 
  createdAt: Date;
}