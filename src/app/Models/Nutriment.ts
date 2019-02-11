export interface INutriment {
  // TODO Verify missing nutriments
  // TODO Verify and bind with real attributes types
  sodium_value: any;
  sodium_100g: any;
  energy: any;
  energy_serving: any;
  energy_100g: any;
  sugars_serving: any;
  sugars_unit: any;
  carbohydrates: any;
  proteins: any;
  carbohydrates_unit: any;
  energy_unit: any;
  proteins_unit: any;
  fat: any;
  energy_value: any;
  sugars_value: any;
  salt_value: any;
  sugars_100g: any;
  salt_serving: any;
  proteins_100g: any;
  sodium_serving: any;
  salt_100g: any;
  fat_unit: any;
  sodium_unit: any;
  carbohydrates_value: any;
  fat_100g: any;
  carbohydrates_serving: any;
  sodium: any;
  carbohydrates_100g: any;
  fat_serving: any;
  proteins_serving: any
  sugars: any;
  salt_unit: any;
  fat_value: any;
  proteins_value: any;
  salt: any;
}

export class Nutriment {
  sodium_value: any;
  sodium_100g: any;
  energy: any;
  energy_serving: any;
  energy_100g: any;
  sugars_serving: any;
  sugars_unit: any;
  carbohydrates: any;
  proteins: any;
  carbohydrates_unit: any;
  energy_unit: any;
  proteins_unit: any;
  fat: any;
  energy_value: any;
  sugars_value: any;
  salt_value: any;
  sugars_100g: any;
  salt_serving: any;
  proteins_100g: any;
  sodium_serving: any;
  salt_100g: any;
  fat_unit: any;
  sodium_unit: any;
  carbohydrates_value: any;
  fat_100g: any;
  carbohydrates_serving: any;
  sodium: any;
  carbohydrates_100g: any;
  fat_serving: any;
  proteins_serving: any
  sugars: any;
  salt_unit: any;
  fat_value: any;
  proteins_value: any;
  salt: any;


  constructor(nutriment) {
    {
      this.sodium_value = nutriment.sodium_value;
      this.sodium_100g = nutriment.sodium_100g;
      this.energy = nutriment.energy;
      this.energy_serving = nutriment.energy_serving;
      this.energy_100g = nutriment.energy_100g;
      this.sugars_serving = nutriment.sugars_unit;
      this.sugars_unit = nutriment.sugars_unit;
      this.carbohydrates = nutriment.carbohydrates;
      this.proteins = nutriment.proteins;
      this.carbohydrates_unit = nutriment.carbohydrates_unit;
      this.energy_unit = nutriment.energy_unit;
      this.proteins_unit = nutriment.proteins_unit;
      this.fat = nutriment.fat;
      this.energy_value = nutriment.energy_value;
      this.sugars_value = nutriment.sugars_value;
      this.salt_value = nutriment.salt_value;
      this.sugars_100g = nutriment.sugars_100g;
      this.salt_serving = nutriment.salt_serving;
      this.proteins_100g = nutriment.proteins_100g;
      this.sodium_serving = nutriment.sodium_serving;
      this.salt_100g = nutriment.salt_100g;
      this.fat_unit = nutriment.fat_unit;
      this.sodium_unit = nutriment.sodium_unit;
      this.carbohydrates_value = nutriment.carbohydrates_value;
      this.fat_100g = nutriment.fat_100g;
      this.carbohydrates_serving = nutriment.carbohydrates_serving;
      this.sodium = nutriment.sodium;
      this.carbohydrates_100g = nutriment.carbohydrates_100g;
      this.fat_serving = nutriment.fat_serving;
      this.proteins_serving = nutriment.proteins_serving;
      this.sugars = nutriment.sugars;
      this.salt_unit = nutriment.salt_unit;
      this.fat_value = nutriment.fat_value;
      this.proteins_value = nutriment.proteins_value;
      this.salt = nutriment.salt;

    }
  }
}
