import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEmployeeInput {
  @Field()
  name: string;

  @Field()
  jobTitle: string;

  @Field(() => Boolean)
  magang: boolean;
}
