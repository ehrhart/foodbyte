
export interface IAdress {
  street: string;
  postalCode: string;
  locality: string;
}

export class Address {
  street: string;
  postalCode: string;
  locality: string;

  constructor(address) {
    {
      this.street = address.street;
      this.postalCode = address.postalCode;
      this.locality = address.locality;
    }
  }
}
