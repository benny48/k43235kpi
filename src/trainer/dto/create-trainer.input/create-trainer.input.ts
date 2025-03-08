import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTrainerInput {
  @Field()
  name: string;

  @Field()
  nip: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
