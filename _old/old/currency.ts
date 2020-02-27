export const AvailableDenominations = {
  platinum: {
    name: 'Platinum',
    value: 1000
  },
  gold: {
    name: 'Gold',
    value: 100
  },
  silver: {
    name: 'Silver',
    value: 10
  },
  copper: {
    name: 'Copper',
    value: 1
  }
};

export interface Denomination {
  name: string;
  value: number;
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

  valueAs(denomination: Denomination): Money | null {
    switch (denomination.name) {
      case AvailableDenominations.platinum.name:
        return this.convertToPlatinum();
        break;

      case AvailableDenominations.gold.name:
        return this.convertToGold();
        break;

      case AvailableDenominations.silver.name:
        return this.convertToSilver();
        break;

      case AvailableDenominations.copper.name:
        return this.convertToCopper();
        break;
    }

    return null;
  }

  get value(): number {
    return this.onHand * this.denomination.value;
  }

  private convertToCopper(): Money {
    return {
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: this.value
    };
  }

  private convertToSilver(): Money {
    return {
      platinum: 0,
      gold: 0,
      silver: this.value / AvailableDenominations.silver.value,
      copper: 0
    };
  }

  private convertToGold(): Money {
    return {
      platinum: 0,
      gold: this.value / AvailableDenominations.gold.value,
      silver: 0,
      copper: 0
    };
  }

  private convertToPlatinum(): Money {
    return {
      platinum: this.value / AvailableDenominations.platinum.value,
      gold: 0,
      silver: 0,
      copper: 0
    };
  }
}
