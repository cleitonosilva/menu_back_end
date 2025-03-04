import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMedicinesDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do medicamento é obrigatório.' })
  remedy: string;

  @IsNumber()
  @IsNotEmpty({ message: 'A quantidade do medicamento é obrigatória.' })
  quantity: number;

  @IsString()
  observation?: string;
}
