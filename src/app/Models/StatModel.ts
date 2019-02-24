
export interface IStatModel {
  name: string;
  value: number;
}

export class StatModel {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    {
      this.name = name;
      this.value = value;
    }
  }
}
