import { Controller, Get, Query } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesQueryParamsDto } from './dto/expenses-query-params-dto';
import { ExpensesQueryParamsMinMaxDto } from './dto/expenses-query-params-min-max-dto';
import { Expense } from './schema/expenses-schema';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  getAll(
    @Query() expensesQueryParamsDto: ExpensesQueryParamsDto,
    @Query() expensesQueryParamsMinMaxDto: ExpensesQueryParamsMinMaxDto,
  ) {
    return this.expensesService.getAll(
      expensesQueryParamsDto,
      expensesQueryParamsMinMaxDto,
    );
  }

  @Get('count')
  getFilterByCost(
    @Query() ExpensesQueryParamsMinMaxDto: ExpensesQueryParamsMinMaxDto,
  ): Promise<Expense[]> {
    const { minCost, maxCost } = ExpensesQueryParamsMinMaxDto;
    const min = parseInt(minCost) || 0;
    const max = parseInt(maxCost) || Number.MAX_VALUE;
    return this.expensesService.getFilterByCost(min, max);
  }
}
