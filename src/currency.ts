/**
 * An interface for representation of a denomination for currency
 *
 * @export
 * @interface Denomination
 */
export interface Denomination {
  /**
   * The name of the denomination
   *
   * @type {string}
   * @memberof Denomination
   */
  name: string;

  /**
   * The multiplier used when calculating the value of the currency associated with this denomination
   *
   * @type {number}
   * @memberof Denomination
   */
  multiplier: number;
}

/**
 * A class that generically represents money
 *
 * @export
 * @class Currency
 */
export class Currency {
  /**
   * The on-hand amount of coins, credits, bills, etc. of this instance of currency
   *
   * @type {number}
   * @memberof Currency
   */
  amount: number = 0;

  /**
   * The denomination of this instance of currency
   *
   * @type {Denomination}
   * @memberof Currency
   */
  readonly denomination: Denomination;

  /**
   * Creates an instance of Currency
   *
   * @param {Denomination} denomination The denomination of this instance of currency
   * @param {number} [amount=0] The on-hand amount of coins, credits, bills, etc. of this instance of currency
   * @memberof Currency
   */
  constructor(denomination: Denomination, amount: number = 0) {
    this.amount = amount;
    this.denomination = denomination;
  }

  /**
   * Gets the total value of this instance of currency. The calculation for this is `amount` * `denomination.value`.
   *
   * @readonly
   * @type {number}
   * @memberof Currency
   */
  get value(): number {
    return this.amount * this.denomination.multiplier;
  }
}
