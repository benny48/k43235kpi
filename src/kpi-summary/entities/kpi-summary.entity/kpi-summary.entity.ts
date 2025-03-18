import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class KpiSummaryEntity {
  @Field(() => [String])
  employee_id: string[];

  @Field(() => Int, { nullable: true })
  minggu_1?: number;

  @Field(() => Int, { nullable: true })
  minggu_3?: number;

  @Field(() => Int, { nullable: true })
  minggu_5?: number;

  @Field(() => Int, { nullable: true })
  minggu_7?: number;

  @Field(() => Int, { nullable: true })
  minggu_9?: number;

  @Field(() => Int, { nullable: true })
  minggu_11?: number;

  @Field(() => Float)
  avg_score: number;

  @Field(() => String)
  grade: string;
}
