import {Nutriment} from "./Nutriment";
import {Ingridient} from "./Ingridient";

export interface IProduct {
  _id: number;
  off_id: number
  name: string;
  prices: any;
  brands: string[];
  ingredients: Ingridient[];
  nutriments: Nutriment[];
  createdAt: string;
  ingredients_text: string;
  nutrition_grade: string;
  updatedAt: string;


}

export class Product {
  _id: number;
  off_id: number;
  name: string;
  prices: any;
  brands: string[];
  ingredients: Ingridient[];
  nutriments: Nutriment[];
  createdAt: string;
  ingredients_text: string;
  nutrition_grade: string;
  updatedAt: string;



  constructor(product) {
    {
      this._id = product._id;
      this.brands = product.brands;
      this.ingredients = product.ingredients;
      this.nutriments= product.nutriments;
      this.off_id = product.off_id;
      this.createdAt = product.createdAt;
      this.name= product.name;
      this.nutrition_grade = product.nutrition_grade;
      this.updatedAt = product.updatedAt;
      this.ingredients_text = product.ingredients_text;
      this.prices = product.prices;
    }
  }
}
