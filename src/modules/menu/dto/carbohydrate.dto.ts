import { IsNotEmpty } from 'class-validator';

export class CarbohydrateDto {
  @IsNotEmpty({ message: 'O nome do alimento é obrigatório.' })
  food: { name: string };

  @IsNotEmpty({ message: 'A quantidade em colheres é obrigatória.' })
  tablespoon: number;

  @IsNotEmpty({ message: 'A quantidade em gramas é obrigatória.' })
  grams: number;
}
