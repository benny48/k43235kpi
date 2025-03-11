import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmployeeEntity {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  position: string;

  @Field()
  trainer: string;

  @Field(() => Boolean)
  magang: boolean;

  @Field(() => [String])
  kpi_id: string[];
}
