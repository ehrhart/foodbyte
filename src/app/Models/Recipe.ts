export interface IRecipe {
  _id: number;
  name: string;
  text: string;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
  user: string;
}

export class Recipe {
  _id: number;
  name: string;
  text: string;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
  user: string;

  constructor(_id: number = null, name: string, text: string, ingredients: string[], createdAt: string, updatedAt: string, user: string ) {
    {
      this._id = _id;
      this.name = name;
      this.text = text;
      this.ingredients = ingredients;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.user = user;

    }
  }
}
