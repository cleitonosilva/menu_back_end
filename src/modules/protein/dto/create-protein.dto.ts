import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FoodDto } from 'src/modules/food/dto/food.dto';

export class CreateProteinDto {
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
