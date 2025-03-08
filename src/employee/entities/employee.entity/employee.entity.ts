import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmployeeEntity {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  jobTitle: string;

  @Field()
  trainer: string;

  @Field(() => Boolean)
  magang: boolean;
}
