import {Nutriment} from "./Nutriment";
import {Ingridient} from "./Ingridient";

export interface IProduct {
  _id: number;
  off_id: number
  name: string;
  prices: number[];
  brands: string[];
  ingredients: Ingridient[];
  nutriments: Nutriment[];
  createdAt: string;
  ingredients_text: string;
  nutrition_grade: string;
  updatedAt: string;
  shop: string[];
  entry_date: string[];
  score: number;


}

export class Product {
  _id: number;
  off_id: number;
  name: string;
  prices: number[];
  brands: string[];
  ingredients: Ingridient[];
  nutriments: Nutriment[];
  createdAt: string;
  ingredients_text: string;
  nutrition_grade: string;
  updatedAt: string;
  shop: string[];
  entry_date: string[];
  score: number;



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
      this.shop= product.shop;
      this.entry_date= product.entry_date;
      this.score = product.score;
    }
  }
}
