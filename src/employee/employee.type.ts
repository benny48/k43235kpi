import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Employee {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  position: string;

  @Field()
  barcode: string;

  @Field(() => [String])
  trainer: string[];

  @Field(() => Boolean)
  magang: boolean;
}
