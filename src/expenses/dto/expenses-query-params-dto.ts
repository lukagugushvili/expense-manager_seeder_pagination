import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ExpensesQueryParamsDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  page?: string = '1';

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  take?: string = '10';
}
