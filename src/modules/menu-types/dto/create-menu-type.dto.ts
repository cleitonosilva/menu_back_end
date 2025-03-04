import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';
import { AtLeastOneProperty } from '../../../common/validators/AtLeastOneProperty';

export class CreateMenuTypeDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do tipo de menu é obrigatório.' })
  name: string;

  @IsInt()
  @Min(0)
  proteinQuantity: number;

  @IsInt()
  @Min(0)
  carbohydrateQuantity: number;

  @IsInt()
  @Min(0)
  accompanimentQuantity: number;

  @AtLeastOneProperty(['proteinQuantity', 'carbohydrateQuantity', 'accompanimentQuantity'], {
    message: 'Pelo menos uma das propriedades Proteína, Carboidrato ou Acompanhamento deve ser maior que 0.'
  })
  atLeastOne!: boolean;
}
