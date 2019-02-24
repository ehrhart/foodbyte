import {Address} from "./Address";
import {Location} from "./Location";

export interface IShop {
  _id: number;
  address: Address;
  name: string;
  updatedAt: string;
  location: Location;
}

export class Shop {
  _id: number;
  address: Address;
  name: string;
  updatedAt: string;
  location: Location;

  constructor(shop) {
    {
      this._id = shop._id;
      this.address = shop.address;
      this.name = shop.name;
      this.updatedAt = shop.updatedAt;
      this.location = shop.Location
    }
  }
}
