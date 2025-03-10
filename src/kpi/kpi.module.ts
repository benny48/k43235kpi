import { Module } from '@nestjs/common';
import { KpiService } from './kpi.service';

@Module({
  providers: [KpiService]
})
export class KpiModule {}
