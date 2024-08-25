import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsString, Max, min, Min } from 'class-validator';

@Schema({ timestamps: true })
export class Expense {
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  model: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @Min(1000)
  cost: number;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @Min(1980)
  @Max(2024)
  year: number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
