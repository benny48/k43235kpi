import { Test, TestingModule } from '@nestjs/testing';
import { KpiSummaryResolver } from './kpi-summary.resolver';

describe('KpiSummaryResolver', () => {
  let resolver: KpiSummaryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KpiSummaryResolver],
    }).compile();

    resolver = module.get<KpiSummaryResolver>(KpiSummaryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
