import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TrainerModule } from './trainer/trainer.module';
import { ConfigModule } from '@nestjs/config';
import { OdooAuthService } from './odoo-auth/odoo-auth.service';
import { KpiModule } from './kpi/kpi.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      path: '/graphql', // Pastikan path GraphQL benar
      playground: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Supaya bisa diakses di semua module
    }),
    EmployeeModule,
    TrainerModule,
    KpiModule,
  ],
  controllers: [AppController],
  providers: [AppService, OdooAuthService],
})
export class AppModule {}
