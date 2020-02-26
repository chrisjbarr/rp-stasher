import { Platinum, Gold, Silver, Copper } from './currency';

export interface Money {
  platinum: number;
  gold: number;
  silver: number;
  copper: number;
}

export class Stash {
  platinum: Platinum = new Platinum();
  gold: Gold = new Gold();
  silver: Silver = new Silver();
  copper: Copper = new Copper();

  constructor({ platinum, gold, silver, copper }: Money) {
    this.platinum = new Platinum(platinum);
    this.gold = new Gold(gold);
    this.silver = new Silver(silver);
    this.copper = new Copper(copper);
  }

  get balance(): Money {
    return {
      platinum: this.platinum.count,
      gold: this.gold.count,
      silver: this.silver.count,
      copper: this.copper.count
    };
  }

  get totalCopperWorth(): number {
    return this.platinum.copperWorth + this.gold.copperWorth + this.silver.copperWorth + this.copper.copperWorth;
  }

  deposit({ platinum, gold, silver, copper }: Money) {
    this.platinum.count += platinum;
    this.gold.count += gold;
    this.silver.count += silver;
    this.copper.count += copper;
  }

  withdrawal({ platinum, gold, silver, copper }: Money) {
    const p: Platinum = new Platinum(platinum);
    const g: Gold = new Gold(gold);
    const s: Silver = new Silver(silver);
    const c: Copper = new Copper(copper);

    let withdrawalWorth = p.copperWorth + g.copperWorth + s.copperWorth + c.copperWorth;

    if (this.totalCopperWorth < withdrawalWorth) {
      throw new Error('Insufficient funds');
    }

    if (withdrawalWorth <= this.copper.copperWorth) {
      this.copper.count -= withdrawalWorth;
    } else {
      withdrawalWorth = withdrawalWorth - this.copper.copperWorth;

      // can our silver coins cover the remaining?
      if (withdrawalWorth <= this.silver.copperWorth) {
        let leftoverSilverCopper = this.silver.copperWorth - withdrawalWorth;

        this.silver.count = Math.floor(leftoverSilverCopper / 10);
        this.copper.count = leftoverSilverCopper % 10;
      } else {
        withdrawalWorth = withdrawalWorth - this.silver.copperWorth;

        if (withdrawalWorth <= this.gold.copperWorth) {
          let leftoverGoldCopper = this.gold.copperWorth - withdrawalWorth;

          this.gold.count = Math.floor(leftoverGoldCopper / 100);
          leftoverGoldCopper = leftoverGoldCopper % 100;
          this.silver.count = Math.floor(leftoverGoldCopper / 10);
          this.copper.count = leftoverGoldCopper % 10;
        } else {
          withdrawalWorth = withdrawalWorth - this.gold.copperWorth;

          if (withdrawalWorth <= this.platinum.copperWorth) {
            let leftoverPlatinumCopper = this.platinum.copperWorth - withdrawalWorth;

            this.platinum.count = Math.floor(leftoverPlatinumCopper / 1000);

            leftoverPlatinumCopper = leftoverPlatinumCopper % 1000;

            this.gold.count = Math.floor(leftoverPlatinumCopper / 100);
            leftoverPlatinumCopper = leftoverPlatinumCopper % 100;

            this.silver.count = Math.floor(leftoverPlatinumCopper / 10);
            this.copper.count = leftoverPlatinumCopper % 10;
          }
        }
      }
    }
  }
}
