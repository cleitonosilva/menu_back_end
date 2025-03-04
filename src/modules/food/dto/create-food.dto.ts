import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do alimento é obrigatório.' })
  name: string;
}
