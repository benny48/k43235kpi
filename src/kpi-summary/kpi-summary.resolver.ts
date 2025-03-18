import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { KpiSummaryService } from './kpi-summary.service';
import { KpiSummaryEntity } from './entities/kpi-summary.entity/kpi-summary.entity';

@Resolver(() => KpiSummaryService)
export class KpiSummaryResolver {
  constructor(private readonly kpiSummaryService: KpiSummaryService) {}

  @Query(() => KpiSummaryEntity, { name: 'getKpiSummary' })
  async getKpiSummary(
    @Args('employeeId', { type: () => Int }) employeeId: number,
  ) {
    return this.kpiSummaryService.getKpiSummary(employeeId);
  }
}
