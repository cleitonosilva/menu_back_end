import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FoodDto {
  @IsMongoId({ message: 'O ID do alimento deve ser válido.' })
  @IsNotEmpty({ message: 'O campo food é obrigatório.' })
  food: string;
}
