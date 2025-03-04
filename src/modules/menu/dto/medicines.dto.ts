import { IsNotEmpty } from 'class-validator';

export class MedicinesDto {
  @IsNotEmpty({ message: 'O nome do remédio é obrigatório.' })
  remedy: string;

  quantity?: number;
  observation?: string;
}
