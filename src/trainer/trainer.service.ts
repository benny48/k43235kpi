import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { OdooAuthService } from '../odoo-auth/odoo-auth.service';

@Injectable()
export class TrainerService {
  constructor(private readonly odooAuthService: OdooAuthService) {}

  private readonly odooUrl = process.env.ODOO_URL;

  async getTrainers(): Promise<any[]> {
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
          'ssm_trainer.ssm_trainer',
          'search_read',
          [[]],
          { fields: ['id', 'name', 'nip', 'username', 'password'] },
        ],
      },
    });

    return response.data.result;
  }

  async validateTrainer(username: string, password: string): Promise<any> {
    const trainers = await this.getTrainers();
    const trainer = trainers.find(
      (tr) => tr.username === username && tr.password === password,
    );

    if (!trainer) {
      throw new Error('Username atau password salah');
    }

    return trainer;
  }
}
