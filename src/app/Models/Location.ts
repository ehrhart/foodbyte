
export interface ILocation {
  coordinates: Array<number>;
}

export class Location {
  coordinates: Array<number>;

  constructor(location) {
    {
      this.coordinates = location.coordinates;

    }
  }
}
