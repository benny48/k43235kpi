import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class KPI {
  @Field()
  schedule: string; // Hanya mengambil schedule

  @Field()
  avr: number;
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

  @Field(() => [KPI]) // Perubahan di sini
  kpi_id: KPI[]; // Ubah menjadi array KPI, bukan String[]
}
