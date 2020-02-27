import 'mocha';
import { expect } from 'chai';

import { Stash, NumericalMap } from '../src/stash';
import { Currency } from '../src/currency';

describe('Stash', () => {
  it('should be created correctly with given parameters', () => {
    const denominations = [
      { name: 'test-denomination-01', value: 10 },
      { name: 'test-denomination-02', value: 100 }
    ];

    const expectedVault = {
      [denominations[0].name]: new Currency(denominations[0], 0),
      [denominations[1].name]: new Currency(denominations[1], 0)
    };

    const stash = new Stash(denominations);

    expect(stash.denominations).to.eql(denominations);
    expect(stash.vault).to.eql(expectedVault);
  });

  it('should throw an error when trying to get the amount of an invalid denomination', () => {
    const denomination1 = 'test-denomination-01';
    const denomination2 = 'test-denomination-02';

    const denominations = [
      { name: denomination1, value: 10 },
      { name: denomination2, value: 100 }
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
      { name: denomination1, value: 10 },
      { name: denomination2, value: 100 }
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
      { name: denomination1, value: 10 },
      { name: denomination2, value: 100 }
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
      { name: denomination1, value: 10 },
      { name: denomination2, value: 100 }
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
      { name: denomination1, value: 10 },
      { name: denomination2, value: 100 }
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
      { name: denomination1, value: 10 },
      { name: denomination2, value: 100 }
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
      { name: denomination1, value: 10 },
      { name: denomination2, value: 100 }
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
      { name: denomination1, value: 10 },
      { name: denomination2, value: 100 }
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
      { name: denomination1, value: denomination1Value },
      { name: denomination2, value: denomination2Value }
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
      { name: denomination1, value: 10 },
      { name: denomination2, value: 100 }
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
      { name: denomination1, value: denomination1Value },
      { name: denomination2, value: denomination2Value }
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
      { name: denomination1, value: denomination1Value },
      { name: denomination2, value: denomination2Value }
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
});
