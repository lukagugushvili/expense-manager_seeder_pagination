import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './schema/expenses-schema';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import { ExpensesQueryParamsDto } from './dto/expenses-query-params-dto';
import { ExpensesQueryParamsMinMaxDto } from './dto/expenses-query-params-min-max-dto';

@Injectable()
export class ExpensesService implements OnModuleInit {
  async onModuleInit() {
    try {
      const count = await this.expenseModel.countDocuments();

      if (count === 0 || count < 10) {
        const expenseToInsert = [];
        for (let i = 0; i < 50; i++) {
          const expense: Expense = {
            model: faker.commerce.productName(),
            cost: parseFloat(faker.commerce.price()),
            year: faker.date.past(10).getFullYear(),
          };
          expenseToInsert.push(expense);
        }
        await this.expenseModel.insertMany(expenseToInsert);
      }
      console.log(`Documents count:${count}`);
    } catch (error) {
      console.log('error initializing module:', error);
    }
  }

  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
  ) {}

  getAll(
    expensesQueryParamsDto: ExpensesQueryParamsDto,
    expensesQueryParamsMinMaxDto: ExpensesQueryParamsMinMaxDto,
  ) {
    const { page, take } = expensesQueryParamsDto;
    const { minCost, maxCost } = expensesQueryParamsMinMaxDto;

    const limit = parseInt(page);
    const perPage = parseInt(take);

    const filter: any = {};
    if (minCost) filter.cost = { $gte: parseFloat(minCost) };
    if (maxCost) filter.cost = { ...filter.cost, $lte: parseFloat(maxCost) };

    return this.expenseModel
      .find(filter)
      .skip((limit - 1) * perPage)
      .limit(perPage);
  }

  async getFilterByCost(min: number, max: number): Promise<Expense[]> {
    return this.expenseModel.find({ cost: { $gte: min, $lte: max } });
    // .countDocuments();
  }
}
