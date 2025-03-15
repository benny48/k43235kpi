import { Injectable } from '@nestjs/common';
import { OdooAuthService } from '../odoo-auth/odoo-auth.service';
import axios from 'axios';
import { CreateKPIInput } from './dto/create-kpi.input/create-kpi.input';

@Injectable()
export class KpiService {
  constructor(private readonly odooAuthService: OdooAuthService) {}

  private readonly odooUrl = process.env.ODOO_URL;

  async getEmployeeKPI(employeeId: number): Promise<any[]> {
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
          'ssm.kpi',
          'search_read',
          [[['name', '=', employeeId]]], // Filter berdasarkan ID Employee
          {
            fields: [
              'name',
              'schedule',
              'pkk',
              'kk',
              'dwpp',
              'kkdp',
              'ikdp',
              'kehadiran',
              'tjpd',
              'kkk',
              'avr',
              'grade',
              'create_date',
            ],
          },
        ],
      },
    });

    return response.data.result;
  }

  async createKPI(input: CreateKPIInput): Promise<boolean> {
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
          'ssm.kpi',
          'create',
          [
            {
              name: input.employeeId,
              schedule: input.schedule,
              pkk: input.pkk,
              kk: input.kk,
              dwpp: input.dwpp,
              kkdp: input.kkdp,
              ikdp: input.ikdp,
              kehadiran: input.kehadiran,
              tjpd: input.tjpd,
              kkk: input.kkk,
            },
          ],
        ],
      },
    });

    return response.data.result !== null;
  }
}
