import { Money, Denomination, Currency } from './currency';

export class Stash {
  platinum: Currency;
  gold: Currency;
  silver: Currency;
  copper: Currency;

  constructor({ platinum, gold, silver, copper }: Money) {
    this.platinum = new Currency(Denomination.Platinum, platinum);
    this.gold = new Currency(Denomination.Gold, gold);
    this.silver = new Currency(Denomination.Silver, silver);
    this.copper = new Currency(Denomination.Copper, copper);

    console.log('Initial Balance: ', this.balance);
  }

  get balance(): Money {
    return {
      platinum: this.platinum.onHand,
      gold: this.gold.onHand,
      silver: this.silver.onHand,
      copper: this.copper.onHand
    };
  }

  get totalCopperWorth(): number {
    return this.platinum.value + this.gold.value + this.silver.value + this.copper.value;
  }

  deposit({ platinum, gold, silver, copper }: Money) {
    this.platinum.onHand += platinum;
    this.gold.onHand += gold;
    this.silver.onHand += silver;
    this.copper.onHand += copper;
  }

  withdrawal({ platinum, gold, silver, copper }: Money) {
    const p: Currency = new Currency(Denomination.Platinum, platinum);
    const g: Currency = new Currency(Denomination.Gold, gold);
    const s: Currency = new Currency(Denomination.Silver, silver);
    const c: Currency = new Currency(Denomination.Copper, copper);

    let withdrawalWorth = p.value + g.value + s.value + c.value;

    if (this.totalCopperWorth < withdrawalWorth) {
      throw new Error('Insufficient funds');
    }

    if (withdrawalWorth <= this.copper.value) {
      this.copper.onHand -= withdrawalWorth;
    } else {
      withdrawalWorth = withdrawalWorth - this.copper.value;

      // can our silver coins cover the remaining?
      if (withdrawalWorth <= this.silver.value) {
        let leftoverSilverCopper = this.silver.value - withdrawalWorth;

        this.silver.onHand = Math.floor(leftoverSilverCopper / 10);
        this.copper.onHand = leftoverSilverCopper % 10;
      } else {
        withdrawalWorth = withdrawalWorth - this.silver.value;

        if (withdrawalWorth <= this.gold.value) {
          let leftoverGoldCopper = this.gold.value - withdrawalWorth;

          this.gold.onHand = Math.floor(leftoverGoldCopper / 100);
          leftoverGoldCopper = leftoverGoldCopper % 100;
          this.silver.onHand = Math.floor(leftoverGoldCopper / 10);
          this.copper.onHand = leftoverGoldCopper % 10;
        } else {
          withdrawalWorth = withdrawalWorth - this.gold.value;

          if (withdrawalWorth <= this.platinum.value) {
            let leftoverPlatinumCopper = this.platinum.value - withdrawalWorth;

            this.platinum.onHand = Math.floor(leftoverPlatinumCopper / 1000);

            leftoverPlatinumCopper = leftoverPlatinumCopper % 1000;

            this.gold.onHand = Math.floor(leftoverPlatinumCopper / 100);
            leftoverPlatinumCopper = leftoverPlatinumCopper % 100;

            this.silver.onHand = Math.floor(leftoverPlatinumCopper / 10);
            this.copper.onHand = leftoverPlatinumCopper % 10;
          }
        }
      }
    }
  }
}
