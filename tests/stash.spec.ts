import 'mocha';
import { expect } from 'chai';

import { Stash, NumericalMap, CurrencyMap, DenominationMap } from '../src/stash';
import { Currency } from '../src/currency';

describe('Stash', () => {
  it('should be created correctly with given parameters', () => {
    const denominations = [
      { name: 'test-denomination-01', multiplier: 10 },
      { name: 'test-denomination-02', multiplier: 100 }
    ];

    const expectedVault: CurrencyMap = {
      [denominations[0].name]: new Currency(denominations[0], 0),
      [denominations[1].name]: new Currency(denominations[1], 0)
    };

    const expectedDenominations: DenominationMap = {
      [denominations[0].name]: denominations[0],
      [denominations[1].name]: denominations[1]
    };

    const stash = new Stash(denominations);

    expect(stash.denominations).to.eql(expectedDenominations);
    expect(stash.vault).to.eql(expectedVault);
  });

  it('should throw an error when trying to get the amount of an invalid denomination', () => {
    const denomination1 = 'test-denomination-01';
    const denomination2 = 'test-denomination-02';

    const denominations = [
      { name: denomination1, multiplier: 10 },
      { name: denomination2, multiplier: 100 }
    ];

    const stash = new Stash(denominations);
    const fakeDenomination = 'fake-denomination';

    const shouldThrow = () => {
      stash.amountOf(fakeDenomination);
    };

    expect(shouldThrow).to.throw(`Stash does not have a denomination definition for: ${fakeDenomination}`);
  });

  it('should return 0 amount for a given denomination prior to any deposits', () => {
    const denomination1 = 'test-denomination-01';
    const denomination2 = 'test-denomination-02';

    const denominations = [
      { name: denomination1, multiplier: 10 },
      { name: denomination2, multiplier: 100 }
    ];

    const stash = new Stash(denominations);
    const actualDenomination1Amount = stash.amountOf(denomination1);
    const actualDenomination2Amount = stash.amountOf(denomination2);

    expect(actualDenomination1Amount).to.equal(0);
    expect(actualDenomination2Amount).to.equal(0);
  });

  it('should return the correct amount for a given denomination after a deposit', () => {
    const denomination1 = 'test-denomination-01';
    const denomination2 = 'test-denomination-02';

    const denominations = [
      { name: denomination1, multiplier: 10 },
      { name: denomination2, multiplier: 100 }
    ];

    const stash = new Stash(denominations);

    const depositAmount1 = 123;
    const depositAmount2 = 3948;

    stash.deposit(denomination1, depositAmount1);
    stash.deposit(denomination2, depositAmount2);

    const actualDenomination1Amount = stash.amountOf(denomination1);
    const actualDenomination2Amount = stash.amountOf(denomination2);

    expect(actualDenomination1Amount).to.equal(depositAmount1);
    expect(actualDenomination2Amount).to.equal(depositAmount2);
  });

  it('should return the correct amounts for all denominations prior to any deposits', () => {
    const denomination1 = 'test-denomination-01';
    const denomination2 = 'test-denomination-02';

    const denominations = [
      { name: denomination1, multiplier: 10 },
      { name: denomination2, multiplier: 100 }
    ];

    const stash = new Stash(denominations);
    const actualStashAmount = stash.amount();
    const expectedStashAmount: NumericalMap = {
      [denomination1]: 0,
      [denomination2]: 0
    };

    expect(actualStashAmount).to.eql(expectedStashAmount);
  });

  it('should return the correct amounts for all denominations after any deposits', () => {
    const denomination1 = 'test-denomination-01';
    const denomination2 = 'test-denomination-02';

    const denominations = [
      { name: denomination1, multiplier: 10 },
      { name: denomination2, multiplier: 100 }
    ];

    const stash = new Stash(denominations);

    const depositAmount1 = 123;
    const depositAmount2 = 3948;

    stash.deposit(denomination1, depositAmount1);
    stash.deposit(denomination2, depositAmount2);

    const actualStashAmount = stash.amount();
    const expectedStashAmount: NumericalMap = {
      [denomination1]: depositAmount1,
      [denomination2]: depositAmount2
    };

    expect(actualStashAmount).to.eql(expectedStashAmount);
  });

  it('should throw an error when trying to get the value of an invalid denomination', () => {
    const denomination1 = 'test-denomination-01';
    const denomination2 = 'test-denomination-02';

    const denominations = [
      { name: denomination1, multiplier: 10 },
      { name: denomination2, multiplier: 100 }
    ];

    const stash = new Stash(denominations);
    const fakeDenomination = 'fake-denomination';

    const shouldThrow = () => {
      stash.valueOf(fakeDenomination);
    };

    expect(shouldThrow).to.throw(`Stash does not have a denomination definition for: ${fakeDenomination}`);
  });

  it('should throw an error when trying to deposit to an invalid denomination', () => {
    const denomination1 = 'test-denomination-01';
    const denomination2 = 'test-denomination-02';

    const denominations = [
      { name: denomination1, multiplier: 10 },
      { name: denomination2, multiplier: 100 }
    ];

    const stash = new Stash(denominations);
    const fakeDenomination = 'fake-denomination';

    const shouldThrow = () => {
      stash.deposit(fakeDenomination, 25);
    };

    expect(shouldThrow).to.throw(`Stash does not have a denomination definition for: ${fakeDenomination}`);
  });

  it('should return 0 value for a given denomination prior to any deposits', () => {
    const denomination1 = 'test-denomination-01';
    const denomination2 = 'test-denomination-02';

    const denominations = [
      { name: denomination1, multiplier: 10 },
      { name: denomination2, multiplier: 100 }
    ];

    const stash = new Stash(denominations);
    const actualDenomination1Amount = stash.valueOf(denomination1);
    const actualDenomination2Amount = stash.valueOf(denomination2);

    expect(actualDenomination1Amount).to.equal(0);
    expect(actualDenomination2Amount).to.equal(0);
  });

  it('should return the correct value for a given denomination after a deposit', () => {
    const denomination1 = 'test-denomination-01';
    const denomination2 = 'test-denomination-02';
    const denomination1Value = 10;
    const denomination2Value = 100;

    const denominations = [
      { name: denomination1, multiplier: denomination1Value },
      { name: denomination2, multiplier: denomination2Value }
    ];

    const stash = new Stash(denominations);

    const depositAmount1 = 123;
    const depositAmount2 = 3948;

    stash.deposit(denomination1, depositAmount1);
    stash.deposit(denomination2, depositAmount2);

    const actualDenomination1Amount = stash.valueOf(denomination1);
    const actualDenomination2Amount = stash.valueOf(denomination2);

    const expectedDenomination1Amount = depositAmount1 * denomination1Value;
    const expectedDenomination2Amount = depositAmount2 * denomination2Value;

    expect(actualDenomination1Amount).to.equal(expectedDenomination1Amount);
    expect(actualDenomination2Amount).to.equal(expectedDenomination2Amount);
  });

  it('should return the correct amounts for all denominations prior to any deposits', () => {
    const denomination1 = 'test-denomination-01';
    const denomination2 = 'test-denomination-02';

    const denominations = [
      { name: denomination1, multiplier: 10 },
      { name: denomination2, multiplier: 100 }
    ];

    const stash = new Stash(denominations);
    const actualStashAmount = stash.amount();
    const expectedStashAmount: NumericalMap = {
      [denomination1]: 0,
      [denomination2]: 0
    };

    expect(actualStashAmount).to.eql(expectedStashAmount);
  });

  it('should return the correct amounts for all denominations after any deposits', () => {
    const denomination1 = 'test-denomination-01';
    const denomination2 = 'test-denomination-02';
    const denomination1Value = 10;
    const denomination2Value = 100;

    const denominations = [
      { name: denomination1, multiplier: denomination1Value },
      { name: denomination2, multiplier: denomination2Value }
    ];

    const stash = new Stash(denominations);

    const depositAmount1 = 10;
    const depositAmount2 = 10;

    stash.deposit(denomination1, depositAmount1);
    stash.deposit(denomination2, depositAmount2);

    const actualStashValue = stash.value();
    const expectedStashValue: NumericalMap = {
      [denomination1]: depositAmount1 * denomination1Value,
      [denomination2]: depositAmount2 * denomination2Value
    };

    expect(actualStashValue).to.eql(expectedStashValue);
  });

  it('should return the correct amounts and values for all denominations after a bulk deposit', () => {
    const denomination1 = 'test-denomination-01';
    const denomination2 = 'test-denomination-02';
    const denomination1Value = 10;
    const denomination2Value = 100;

    const denominations = [
      { name: denomination1, multiplier: denomination1Value },
      { name: denomination2, multiplier: denomination2Value }
    ];

    const stash = new Stash(denominations);

    const depositAmount1 = 10;
    const depositAmount2 = 10;

    stash.depositBulk({
      [denomination1]: depositAmount1,
      [denomination2]: depositAmount2
    });

    const actualStashAmount = stash.amount();
    const expectedStashAmount: NumericalMap = {
      [denomination1]: depositAmount1,
      [denomination2]: depositAmount2
    };

    const actualStashValue = stash.value();
    const expectedStashValue: NumericalMap = {
      [denomination1]: depositAmount1 * denomination1Value,
      [denomination2]: depositAmount2 * denomination2Value
    };

    expect(actualStashAmount).to.eql(expectedStashAmount);
    expect(actualStashValue).to.eql(expectedStashValue);
  });

  it('should return the correct total value for the given funds', () => {
    const denomination1 = 'test-denomination-01';
    const denomination2 = 'test-denomination-02';
    const denomination1Value = 10;
    const denomination2Value = 100;
    const denomination1Amount = 123;
    const denomination2Amount = 310;

    const denominations = [
      { name: denomination1, multiplier: denomination1Value },
      { name: denomination2, multiplier: denomination2Value }
    ];

    const funds: CurrencyMap = {
      [denominations[0].name]: new Currency(denominations[0], denomination1Amount),
      [denominations[1].name]: new Currency(denominations[1], denomination2Amount)
    };

    const stash = new Stash(denominations);

    const totalValue = stash.calculateTotalValue(funds);
    const expectedValue = denomination1Value * denomination1Amount + denomination2Value * denomination2Amount;

    expect(totalValue).to.equal(expectedValue);
  });

  it('should accurately determine if enough funds are available to cover a transaction', () => {
    const denomination1 = 'test-denomination-01';
    const denomination2 = 'test-denomination-02';
    const denomination1Value = 10;
    const denomination2Value = 100;

    const denominations = [
      { name: denomination1, multiplier: denomination1Value },
      { name: denomination2, multiplier: denomination2Value }
    ];

    const stash = new Stash(denominations);

    const depositAmount1 = 10;
    const depositAmount2 = 10;

    stash.depositBulk({
      [denomination1]: depositAmount1,
      [denomination2]: depositAmount2
    });

    // total value in stash is 1100

    const fundsAreAvailableCheck1: NumericalMap = {
      [denomination1]: 100 // total value of 100x10 = 1000; (this is more than the amount we deposited for this denomination, so the stash internally will pull from other denominations)
    };

    const fundsAreAvailableCheck2: NumericalMap = {
      [denomination2]: 5 // total value of 5x100 = 500;
    };

    const fundsAreAvailableCheck3: NumericalMap = {
      [denomination1]: 70, // total value of 70x10 = 700;
      [denomination2]: 3 // total value of 3x100 = 300; // Total is 1000... we good
    };

    const fundsAreNotAvailableCheck1: NumericalMap = {
      [denomination1]: 1000 // total value of 1000x10 = 10000
    };

    const fundsAreNotAvailableCheck2: NumericalMap = {
      [denomination1]: 22, // total value of 10x22 = 220; (this is more than the 'amount' we deposited, so the stash internally will pull from other denominations)
      [denomination2]: 9 // total value of 90x100 = 900; (total of 1050, so we don't have enough)
    };

    const fundsAreNotAvailableCheck3: NumericalMap = {
      [denomination2]: 13 // total value of 13x100 = 1300
    };

    expect(stash.areEnoughFundsAvailable(fundsAreAvailableCheck1)).to.eql(true);
    expect(stash.areEnoughFundsAvailable(fundsAreAvailableCheck2)).to.eql(true);
    expect(stash.areEnoughFundsAvailable(fundsAreAvailableCheck3)).to.eql(true);
    expect(stash.areEnoughFundsAvailable(fundsAreNotAvailableCheck1)).to.eql(false);
    expect(stash.areEnoughFundsAvailable(fundsAreNotAvailableCheck2)).to.eql(false);
    expect(stash.areEnoughFundsAvailable(fundsAreNotAvailableCheck3)).to.eql(false);
  });
});
