import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAccompanimentDto {
  @IsMongoId({ message: 'O ID do alimento deve ser um ObjectId válido.' })
  @IsNotEmpty({ message: 'O alimento é obrigatório.' })
  food: string; 

  @IsNumber()
  @IsNotEmpty({ message: 'A quantidade em gramas é obrigatória.' })
  grams: number;

  @IsNumber()
  @IsNotEmpty({ message: 'A quantidade em colheres é obrigatória.' })
  tablespoon: number;
}
