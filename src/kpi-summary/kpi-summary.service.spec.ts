import { Test, TestingModule } from '@nestjs/testing';
import { KpiSummaryService } from './kpi-summary.service';

describe('KpiSummaryService', () => {
  let service: KpiSummaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KpiSummaryService],
    }).compile();

    service = module.get<KpiSummaryService>(KpiSummaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
