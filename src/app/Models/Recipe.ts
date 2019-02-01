export interface IRecipe {
  id: number;
  title: string;
  category: string;
  tag: string;
}

export class Product {
  id: number;
  title: string;
  category: string;
  tag: string;
  constructor(product) {
    {
      this.id = product.id;
      this.title = product.title;
      this.category = product.category;
    }
  }
}
