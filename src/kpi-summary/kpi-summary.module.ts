import { Module } from '@nestjs/common';
import { KpiSummaryService } from './kpi-summary.service';
import { KpiSummaryResolver } from './kpi-summary.resolver';
import { OdooAuthService } from '../odoo-auth/odoo-auth.service';

@Module({
  providers: [KpiSummaryService, KpiSummaryResolver, OdooAuthService],
})
export class KpiSummaryModule {}
