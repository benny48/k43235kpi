import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class KPI {
  @Field()
  schedule: string; // Hanya mengambil schedule

  @Field()
  avr: number;

  @Field({ nullable: true })
  create_date?: string;
}

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

  @Field(() => [KPI]) // Perubahan di sini ok
  kpi_id: KPI[]; // Ubah menjadi array KPI, bukan String[]

  @Field(() => String, { nullable: true })
  avatar_128: string;
}
