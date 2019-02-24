
export interface IPrice {
  _id: number;
  shopId: number;
  productId: number;
  date: string;
  price: any;
  __v: number;
}

export class Price {
  _id: number;
  shopId: number;
  productId: number;
  date: string;
  price: any;
  __v: number;

  constructor(price) {
    {
      this._id= price._id;
      this.shopId =  price.shopId;
      this.productId=  price.productId;
      this.date = price.date;
      this.price = price.price;
      this.__v = price.__v;
    }
  }
}
