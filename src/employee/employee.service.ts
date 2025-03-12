import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { OdooAuthService } from '../odoo-auth/odoo-auth.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly odooAuthService: OdooAuthService) {}

  private readonly odooUrl = process.env.ODOO_URL;

  async getEmployees(magang?: boolean, trainerId?: number): Promise<any[]> {
    const uid = await this.odooAuthService.authenticate();
    if (!uid) throw new Error('Gagal autentikasi ke Odoo');

    // Tambahkan filter berdasarkan 'magang' dan 'trainer'
    const domain = [];
    if (magang !== undefined) domain.push(['magang', '=', magang]);
    if (trainerId !== undefined) domain.push(['trainer', '=', trainerId]);

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
          'hr.employee',
          'search_read',
          [domain], // Gunakan filter yang sudah dibuat
          {
            fields: [
              'id',
              'name',
              'position',
              'trainer',
              'magang',
              'kpi_id',
              'avatar_128',
            ],
          },
        ],
      },
    });

    let employees: any[] = response.data.result;

    // Ambil semua KPI yang terkait
    const kpiIds = employees.flatMap((emp) => emp.kpi_id).filter((id) => id);
    let kpiData: Record<string, any> = {}; // Gunakan tipe yang lebih eksplisit

    if (kpiIds.length > 0) {
      const kpiResponse = await axios.post(this.odooUrl, {
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
            [[['id', 'in', kpiIds]]], // Ambil KPI berdasarkan ID
            { fields: ['id', 'name', 'schedule', 'avr'] },
          ],
        },
      });

      kpiData = Object.fromEntries(
        kpiResponse.data.result.map((kpi) => [kpi.id, kpi]),
      );
    }

    // Mapping KPI ke masing-masing employee
    employees = employees.map((emp) => ({
      ...emp,
      kpi_id: emp.kpi_id
        .map((kpiId: string) => kpiData[kpiId] || null)
        .filter(Boolean)
        .slice(-1) // Ambil hanya elemen terakhir
        .map((kpi) => ({
          schedule: kpi.schedule,
          avr: kpi.avr,
        })), // Tetap dalam bentuk array
    }));

    return employees; // Pastikan return sesuai ekspektasi
  }

  async createEmployee(name: string, position: string): Promise<any> {
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
          'hr.employee',
          'create',
          [{ name, position }],
        ],
      },
    });

    const newEmployeeId = response.data.result;
    return { id: newEmployeeId, name, position };
  }
}
