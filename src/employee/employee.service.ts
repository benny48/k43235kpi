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
            fields: ['id', 'name', 'position', 'barcode', 'trainer', 'magang'],
          },
        ],
      },
    });

    return response.data.result;
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
