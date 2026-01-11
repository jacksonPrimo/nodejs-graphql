import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AppointmentModel {
  @Field(() => String) 
  id: String;

  @Field(() => String) 
  customerId: String;

  @Field(() => Date) 
  startsAt: Date;

  @Field(() => Date) 
  endsAt: Date;
}