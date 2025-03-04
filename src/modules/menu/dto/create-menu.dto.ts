import { IsMongoId, IsArray, ValidateNested, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ProteinDto } from './protein.dto';
import { CarbohydrateDto } from './carbohydrate.dto';
import { AccompanimentDto } from './accompaniment.dto';
import { MedicinesDto } from './medicines.dto';

export class CreateMenuDto {
  @IsMongoId({ message: 'O menuType deve ser um ID válido do MongoDB.' })
  @IsNotEmpty({ message: 'O campo menuType é obrigatório.' })
  menuType: string;

  @ValidateNested()
  @Type(() => ProteinDto)
  @IsNotEmpty({ message: 'Proteína é obrigatória se o tipo de menu exigir.' })
  protein: ProteinDto;

  @ValidateNested({ each: true })
  @Type(() => CarbohydrateDto)
  @IsOptional() 
  @IsArray({ message: 'Carboidrato deve ser um array se for enviado.' })
  carbohydrate?: CarbohydrateDto[];

  @ValidateNested({ each: true })
  @Type(() => AccompanimentDto)
  @IsOptional() 
  @IsArray({ message: 'Acompanhamento deve ser um array se for enviado.' })
  accompaniment?: AccompanimentDto[];

  @ValidateNested({ each: true })
  @Type(() => MedicinesDto)
  @IsOptional() 
  @IsArray({ message: 'Medicines deve ser um array se for enviado.' })
  medicines?: MedicinesDto[];
}
