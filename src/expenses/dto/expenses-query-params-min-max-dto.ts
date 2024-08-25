import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ExpensesQueryParamsMinMaxDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  minCost?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  maxCost?: string;
}
