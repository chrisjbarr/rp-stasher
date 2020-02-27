import { Currency, Denomination } from './currency';

/* TODO: Begin - Does something like this already exist in TS? */
export interface NumericalMap {
  [indexer: string]: number;
}

export interface DenominationMap {
  [indexer: string]: Denomination;
}

export interface CurrencyMap {
  [indexer: string]: Currency;
}
/* TODO: End - Does something like this already exist in TS? */

/**
 * A stash AKA bank for managing currency
 *
 * @export
 * @class Stash
 */
export class Stash {
  /**
   * An array of denominations that this stash supports
   *
   * @type {Denomination[]}
   * @memberof Stash
   */
  denominations: DenominationMap = {};

  /**
   * A mapping of denominations to instances of Currency that represents that denomination
   *
   * @type {CurrencyMap}
   * @memberof Stash
   */
  vault: CurrencyMap = {};

  /**
   * Creates an instance of Stash.
   * @param {Denomination[]} denominations An array of denominations that this stash will support
   * @memberof Stash
   */
  constructor(denominations: Denomination[]) {
    for (let denomination of denominations) {
      this.vault[denomination.name] = new Currency(denomination, 0);
      this.denominations[denomination.name] = denomination;
    }
  }

  /**
   * Gets the value of each individual denomination in the vault
   *
   * @returns {NumericalMap}
   * @memberof Stash
   */
  value(): NumericalMap {
    const vaultValue: NumericalMap = {};

    Object.keys(this.vault).forEach(key => {
      vaultValue[key] = this.vault[key].value;
    });

    return vaultValue;
  }

  /**
   * Gets the amount of each individual denomination in the vault
   *
   * @returns {NumericalMap}
   * @memberof Stash
   */
  amount(): NumericalMap {
    const vaultAmount: NumericalMap = {};

    Object.keys(this.vault).forEach(key => {
      vaultAmount[key] = this.vault[key].amount;
    });

    return vaultAmount;
  }

  /**
   * Gets the value of the specified denomination
   *
   * @param {string} denomination The denomination of the currency to get the value of
   * @returns {number}
   * @memberof Stash
   */
  valueOf(denomination: string): number {
    this.ensureDenominationSupported(denomination);

    return this.vault[denomination].value;
  }

  /**
   * Gets the amount of the specified denomination
   *
   * @param {string} denomination The denomination of the currency to get the amount of
   * @returns {number}
   * @memberof Stash
   */
  amountOf(denomination: string): number {
    this.ensureDenominationSupported(denomination);

    return this.vault[denomination].amount;
  }

  /**
   * Deposits the denomination in the amount specified
   *
   * @param {string} denomination The denomination of the currency to be deposited
   * @param {number} amount The amount (not the value) of currency to be deposit
   * @memberof Stash
   */
  deposit(denomination: string, amount: number): void {
    this.ensureDenominationSupported(denomination);

    this.vault[denomination].amount += amount;
  }

  /**
   * Deposits the amounts specified for the given denominations
   *
   * @param {NumericalMap} transaction
   * @memberof Stash
   */
  depositBulk(transaction: NumericalMap): void {
    Object.keys(transaction).forEach(key => {
      this.deposit(key, transaction[key]);
    });
  }

  /**
   * Determines if there is enough funds to cover the given amount specified
   *
   * @param {NumericalMap} transaction The denominations and amounts looking to be covered.
   * @returns {boolean}
   * @memberof Stash
   */
  areEnoughFundsAvailable(transaction: NumericalMap): boolean {
    // translate transaction to currency
    const funds: CurrencyMap = {};

    Object.keys(funds).forEach(key => {
      funds[key] = new Currency(this.denominations[key], transaction[key]);
    });

    const vaultValue = this.totalValue(this.vault);
    const fundsValue = this.totalValue(funds);

    return vaultValue >= fundsValue;
  }

  /**
   * Gets the total value of all specified funds
   *
   * @param {CurrencyMap} funds - The funds to calculate the total value for
   * @returns {number}
   * @memberof Stash
   */
  totalValue(funds: CurrencyMap): number {
    return Object.keys(funds).reduce((acc, key) => {
      return acc + funds[key].value;
    }, 0);
  }

  /**
   * Ensures that the vault has the specified denomination, raises an error if not.
   *
   * @private
   * @param {string} denomination The denomination to ensure exists in the vault
   * @memberof Stash
   */
  private ensureDenominationSupported(denomination: string): void {
    if (!Object.prototype.hasOwnProperty.call(this.vault, denomination)) {
      throw new Error(`Stash does not have a denomination definition for: ${denomination}`);
    }
  }
}
