import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FoodDto } from '../../food/dto/food.dto';

export class CreateCarbohydrateDto {
  @ValidateNested()
  @Type(() => FoodDto)
  @IsNotEmpty({ message: 'O alimento é obrigatório.' })
  food: FoodDto;

  @IsNumber()
  @IsNotEmpty({ message: 'A quantidade em colheres é obrigatória.' })
  tablespoon: number;

  @IsNumber()
  @IsNotEmpty({ message: 'A quantidade em gramas é obrigatória.' })
  grams: number;
}
