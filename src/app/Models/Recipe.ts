import {Product} from "./Product";

export interface IRecipe {
  _id: number;
  name: string;
  text: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
  user: string;
  comments: Comment[];
  image_url: string;
  image_thumb_url: string;
  avgRating: any;
}

export class Recipe {
  _id: number;
  name: string;
  text: string;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
  user: string;
  comments: Comment[];
  image_url: string;
  image_thumb_url: string;
  avgRating: any;

  constructor(_id: number = null,
              name: string,
              text: string,
              products: Product[],
              createdAt: Date,
              updatedAt: Date,
              user: string,
              comments: Comment[] = null,
              image_url: string =null,
              image_thumb_url: string=null,
              avgRating: any =null) {
    {
      this._id = _id;
      this.name = name;
      this.text = text;
      this.products = products;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.user = user;
      this.comments = comments;
      this.image_url = image_url;
      this.image_thumb_url = image_thumb_url;
      this.avgRating =avgRating;
    }
  }
}
