
export interface IIngredient {
  text: string;
  id: string;
  rank: number;
  percent: string;
}

export class Ingridient {
  text: string;
  id: string;
  rank: number;
  percent: string;



  constructor(ingridient) {
    {
      this.id = ingridient.id;
      this.rank = ingridient.rank;
      this.text = ingridient.text;
      this.percent = ingridient.percent;
    }
  }
}
