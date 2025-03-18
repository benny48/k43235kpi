import { Injectable } from '@nestjs/common';
import { OdooAuthService } from '../odoo-auth/odoo-auth.service';
import axios from 'axios';
import { KpiSummaryEntity } from './entities/kpi-summary.entity/kpi-summary.entity';

@Injectable()
export class KpiSummaryService {
  constructor(private readonly odooAuthService: OdooAuthService) {}

  private readonly odooUrl = process.env.ODOO_URL;

  async getKpiSummary(employeeId: number): Promise<KpiSummaryEntity> {
    const uid = await this.odooAuthService.authenticate();
    if (!uid) throw new Error('Gagal autentikasi ke Odoo');

    const response = await axios.post(this.odooUrl, {
      jsonrpc: '2.0',
      method: 'call',
      id: new Date().getTime(),
      params: {
        service: 'object',
        method: 'execute_kw',
        args: [
          process.env.ODOO_DB,
          uid,
          process.env.ODOO_PASSWORD,
          'ssm.kpi.summary',
          'search_read',
          [[['employee_id', '=', employeeId]]], // Filter berdasarkan employee_id
          {
            fields: [
              'minggu_1',
              'minggu_3',
              'minggu_5',
              'minggu_7',
              'minggu_9',
              'minggu_11',
              'avg_score',
              'grade',
            ],
          },
        ],
      },
    });

    if (!response.data.result || response.data.result.length === 0) {
      throw new Error('Data KPI Summary tidak ditemukan');
    }

    return response.data.result[0];
  }
}
