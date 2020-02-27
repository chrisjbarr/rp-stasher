export interface Denomination {
  name: string;
  multiplier: number;
}

export class Currency {
  amount: number = 0;
  readonly denomination: Denomination;

  constructor(denomination: Denomination, amount: number = 0) {
    this.amount = amount;
    this.denomination = denomination;
  }

  get value(): number {
    return this.amount * this.denomination.multiplier;
  }
}
