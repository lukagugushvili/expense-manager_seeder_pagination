import { PartialType } from '@nestjs/swagger';
import { CreateExpenseDto } from './expenses-create-dto';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {}
