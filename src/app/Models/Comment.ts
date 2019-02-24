import {User} from "./User";

export interface IComment {
  _id: number;
  content: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export class Comment {
  _id: number;
  content: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;

  constructor(_id: number = null,
  content: string,
  user: User,
  createdAt: Date = null,
  updatedAt: Date = null) {
    {
      this._id = _id;
      this.content = content;
      this.user = user;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
}
