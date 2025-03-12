import { Module } from '@nestjs/common';
import { KpiService } from './kpi.service';
import { KPIResolver } from './kpi.resolver';
import { OdooAuthService } from '../odoo-auth/odoo-auth.service';

@Module({
  providers: [KpiService, KPIResolver, OdooAuthService],
})
export class KpiModule {}
