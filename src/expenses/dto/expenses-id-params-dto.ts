import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class ExpensesIdParamsDto {
  @IsMongoId()
  @IsString()
  id: string;
}
