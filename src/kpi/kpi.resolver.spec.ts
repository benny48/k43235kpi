import { Test, TestingModule } from '@nestjs/testing';
import { KPIResolver } from './kpi.resolver';

describe('KPIResolver', () => {
  let resolver: KPIResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KPIResolver],
    }).compile();

    resolver = module.get<KPIResolver>(KPIResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
