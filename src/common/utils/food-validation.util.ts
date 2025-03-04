import { Model } from 'mongoose';
import { Carbohydrate } from '../../schemas/carbohydrate.schema';
import { Protein } from '../../schemas/protein.schema';
import { Accompaniment } from '../../schemas/accompaniment.schema';
import { Medicines } from '../../schemas/medicines.schema';

export async function isFoodAlreadyUsed(
  foodId: string,
  carbohydrateModel: Model<Carbohydrate>,
  proteinModel: Model<Protein>,
  accompanimentModel: Model<Accompaniment>,
  medicinesModel: Model<Medicines>
): Promise<boolean> {
  const existsInCarbohydrate = await carbohydrateModel.exists({ food: foodId });
  const existsInProtein = await proteinModel.exists({ food: foodId });
  const existsInAccompaniment = await accompanimentModel.exists({ food: foodId });
  const existsInMedicines = await medicinesModel.exists({ food: foodId });

  return !!(existsInCarbohydrate || existsInProtein || existsInAccompaniment || existsInMedicines);
}
