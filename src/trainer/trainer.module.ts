import { Module } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { TrainerResolver } from './trainer.resolver';
import { OdooAuthService } from 'src/odoo-auth/odoo-auth.service';

@Module({
  providers: [TrainerService, TrainerResolver, OdooAuthService],
})
export class TrainerModule {}
