import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  cost: number;

  @IsNotEmpty()
  @IsString()
  year: number;
}
