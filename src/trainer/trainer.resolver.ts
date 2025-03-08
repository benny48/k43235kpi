import { Resolver, Query, Args } from '@nestjs/graphql';
import { TrainerService } from './trainer.service';
import { TrainerEntity } from './entities/trainer.entity/trainer.entity';

@Resolver(() => TrainerEntity)
export class TrainerResolver {
  constructor(private readonly trainerService: TrainerService) {}

  @Query(() => [TrainerEntity], {
    name: 'trainers',
    description: 'Get all trainers',
  })
  async getTrainers() {
    return this.trainerService.getTrainers();
  }

  @Query(() => TrainerEntity, { name: 'validateTrainer' })
  async validateTrainer(
    @Args('username', { description: 'Trainer username' }) username: string,
    @Args('password', { description: 'Trainer password' }) password: string,
  ) {
    return this.trainerService.validateTrainer(username, password);
  }
}
