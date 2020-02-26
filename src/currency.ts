export enum Denomination {
  Platinum = 1000,
  Gold = 100,
  Silver = 10,
  Copper = 1
}

export interface Money {
  platinum: number;
  gold: number;
  silver: number;
  copper: number;
}

export class Currency {
  onHand: number = 0;
  readonly denomination: Denomination;

  constructor(denomination: Denomination, onHand: number = 0) {
    this.onHand = onHand;
    this.denomination = denomination;
  }

  convert(denomination: Denomination): Money {
    switch (denomination) {
      case Denomination.Platinum:
        return this.convertToPlatinum();
        break;

      case Denomination.Gold:
        return this.convertToGold();
        break;

      case Denomination.Silver:
        return this.convertToSilver();
        break;

      case Denomination.Copper:
        return this.convertToCopper();
        break;
    }
  }

  get value(): number {
    return this.onHand * this.denomination;
  }

  private convertToCopper(): Money {
    return {
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: this.onHand * this.denomination
    };
  }

  private convertToSilver(): Money {
    return {
      platinum: 0,
      gold: 0,
      silver: (this.onHand * this.denomination) / Denomination.Silver,
      copper: 0
    };
  }

  private convertToGold(): Money {
    return {
      platinum: 0,
      gold: (this.onHand * this.denomination) / Denomination.Gold,
      silver: 0,
      copper: 0
    };
  }

  private convertToPlatinum(): Money {
    return {
      platinum: (this.onHand * this.denomination) / Denomination.Platinum,
      gold: 0,
      silver: 0,
      copper: 0
    };
  }
}
