import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.type';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [Employee], { name: 'employees' }) // Nama Query: employees
  async getEmployees(
    @Args('magang', { type: () => Boolean, nullable: true }) magang?: boolean,
    @Args('trainerId', { type: () => Number, nullable: true })
    trainerId?: number, // Tambahkan filter trainerId
  ) {
    return await this.employeeService.getEmployees(magang, trainerId);
  }

  @Mutation(() => Employee)
  async createEmployee(
    @Args('name') name: string,
    @Args('position') position: string,
  ) {
    return this.employeeService.createEmployee(name, position);
  }
}
