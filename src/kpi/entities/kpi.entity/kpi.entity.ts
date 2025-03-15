import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class KpiEntity {
  @Field(() => Int)
  id: number;

  @Field(() => [String])
  name: string[];

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

  @Field(() => Int)
  avr: number;

  @Field()
  grade: string;

  @Field()
  create_date: string;
}
