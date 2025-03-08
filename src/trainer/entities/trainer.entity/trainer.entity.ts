import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType({ description: 'Trainer Entity' }) // Menambahkan deskripsi
export class TrainerEntity {
  @Field(() => Int, { description: 'Unique Trainer ID' })
  id: number;

  @Field({ description: 'Full Name of the Trainer' })
  name: string;

  @Field({ description: 'NIP (Nomor Induk Pegawai) of the Trainer' })
  nip: string;

  @Field({ description: 'Username for authentication' })
  username: string;

  @Field({ description: 'Password (hashed for security)' })
  password: string;
}
