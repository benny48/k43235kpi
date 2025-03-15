import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateKPIInput {
  @Field(() => Int)
  employeeId: number;

  @Field()
  schedule: string;

  @Field(() => Int)
  pkk: number;

  @Field(() => Int)
  kk: number;

  @Field(() => Int)
  dwpp: number;

  @Field(() => Int)
  kkdp: number;

  @Field(() => Int)
  ikdp: number;

  @Field(() => Int)
  kehadiran: number;

  @Field(() => Int)
  tjpd: number;

  @Field(() => Int)
  kkk: number;
}
