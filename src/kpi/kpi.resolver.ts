import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { KpiService } from './kpi.service';
import { KpiEntity } from './entities/kpi.entity/kpi.entity';
import { CreateKPIInput } from './dto/create-kpi.input/create-kpi.input';

@Resolver()
export class KPIResolver {
  constructor(private readonly kpiService: KpiService) {}

  @Query(() => [KpiEntity])
  async getKPIByEmployee(@Args('employeeId') employeeId: number) {
    return this.kpiService.getEmployeeKPI(employeeId);
  }

  @Mutation(() => Boolean)
  async createKPI(@Args('input') input: CreateKPIInput) {
    return this.kpiService.createKPI(input);
  }
}
