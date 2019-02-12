
export interface IUser {
  _id: number;
  fullname: string;
}

export class User {
  _id: number;
  fullname: string;

  constructor(user) {
    {
      this._id = user._id;
      this.fullname = user.fullname;
    }
  }
}
