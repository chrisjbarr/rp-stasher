import 'mocha';
import { expect } from 'chai';

import { Stash } from '../stash';
import { Currency, Money, AvailableDenominations } from '../currency';

// describe('Generic testing', () => {
//   it('jsut a test.. ', () => {
//     const currency = new Currency(1, AvailableDenominations.platinum);

//     const result = currency.valueAs(AvailableDenominations.copper);
//     expect(result).to.equal(null);
//   });
// });

describe('1 platinum currency', () => {
  it('should value as 1000 copper exactly', () => {
    const currency = new Currency(AvailableDenominations.platinum, 1);

    const expectedResult = {
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: 1000
    };

    const result = currency.valueAs(AvailableDenominations.copper);
    expect(result).to.eql(expectedResult);
  });

  it('should value as 100 silver exactly', () => {
    const currency = new Currency(AvailableDenominations.platinum, 1);

    const expectedResult = {
      platinum: 0,
      gold: 0,
      silver: 100,
      copper: 0
    };

    const result = currency.valueAs(AvailableDenominations.silver);
    expect(result).to.eql(expectedResult);
  });

  it('should value as 10gold exactly', () => {
    const currency = new Currency(AvailableDenominations.platinum, 1);

    const expectedResult = {
      platinum: 0,
      gold: 10,
      silver: 0,
      copper: 0
    };

    const result = currency.valueAs(AvailableDenominations.gold);
    expect(result).to.eql(expectedResult);
  });

  it('should value as platinum exactly', () => {
    const currency = new Currency(AvailableDenominations.platinum, 1);

    const expectedResult = {
      platinum: 1,
      gold: 0,
      silver: 0,
      copper: 0
    };

    const result = currency.valueAs(AvailableDenominations.platinum);
    expect(result).to.eql(expectedResult);
  });
});

describe('1 gold Currency', () => {
  it('should value as 100 copper exactly', () => {
    const currency = new Currency(AvailableDenominations.gold, 1);

    const expectedResult = {
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: 100
    };

    const result = currency.valueAs(AvailableDenominations.copper);
    expect(result).to.eql(expectedResult);
  });

  it('should value as 10 silver exactly', () => {
    const currency = new Currency(AvailableDenominations.gold, 1);

    const expectedResult = {
      platinum: 0,
      gold: 0,
      silver: 10,
      copper: 0
    };

    const result = currency.valueAs(AvailableDenominations.silver);
    expect(result).to.eql(expectedResult);
  });

  it('should value as 1 gold exactly', () => {
    const currency = new Currency(AvailableDenominations.gold, 1);

    const expectedResult = {
      platinum: 0,
      gold: 1,
      silver: 0,
      copper: 0
    };

    const result = currency.valueAs(AvailableDenominations.gold);
    expect(result).to.eql(expectedResult);
  });
});

describe('1 silver currency', () => {
  it('should value as 10 copper exactly', () => {
    const currency = new Currency(AvailableDenominations.silver, 1);

    const expectedResult = {
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: 10
    };

    const result = currency.valueAs(AvailableDenominations.copper);
    expect(result).to.eql(expectedResult);
  });

  it('should value as 1 silver exactly', () => {
    const currency = new Currency(AvailableDenominations.silver, 1);

    const expectedResult = {
      platinum: 0,
      gold: 0,
      silver: 1,
      copper: 0
    };

    const result = currency.valueAs(AvailableDenominations.silver);
    expect(result).to.eql(expectedResult);
  });
});

describe('1 copper currency', () => {
  it('should value as 1 copper exactly', () => {
    const currency = new Currency(AvailableDenominations.copper, 1);

    const expectedResult = {
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: 1
    };

    const result = currency.valueAs(AvailableDenominations.copper);
    expect(result).to.eql(expectedResult);
  });
});

describe('Stash', () => {
  it('should deposit correctly', () => {
    const initialBalance: Money = {
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: 0
    };

    const deposit: Money = {
      platinum: 10,
      gold: 10,
      silver: 10,
      copper: 10
    };

    const stash = new Stash(initialBalance);
    stash.deposit(deposit);

    expect(stash.balance).to.eql(deposit);
  });

  it('should throw an error if stash has insufficient funds to cover withdrawal', () => {
    const shouldThrow = (): void => {
      const initialBalance: Money = {
        platinum: 0,
        gold: 0,
        silver: 0,
        copper: 10
      };

      const withdrawal: Money = {
        platinum: 0,
        gold: 0,
        silver: 0,
        copper: 15
      };

      new Stash(initialBalance).withdrawal(withdrawal);
    };

    expect(shouldThrow).to.throw('Insufficient funds');
  });

  it('should withdrawal copper when copper pieces cover the withdrawal amount', () => {
    const initialBalance: Money = {
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: 30
    };

    const withdrawal: Money = {
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: 15
    };

    const stash = new Stash(initialBalance);
    stash.withdrawal(withdrawal);

    expect(stash.balance.copper).to.equal(15);
  });

  it('should withdrawal all copper and some silver when we need more copper than copper pieces available', () => {
    const initialBalance: Money = {
      platinum: 0,
      gold: 0,
      silver: 5,
      copper: 30
    };

    const withdrawal: Money = {
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: 45
    };

    const stash = new Stash(initialBalance);
    stash.withdrawal(withdrawal);

    expect(stash.balance.silver).to.equal(3);
    expect(stash.balance.copper).to.equal(5);
  });

  it('should withdrawal all copper, silver and some gold when we need more copper than copper pieces available', () => {
    const initialBalance: Money = {
      platinum: 0,
      gold: 1,
      silver: 5,
      copper: 30
    };

    const withdrawal: Money = {
      platinum: 0,
      gold: 0,
      silver: 5,
      copper: 45
    };

    const stash = new Stash(initialBalance);
    stash.withdrawal(withdrawal);

    expect(stash.balance.gold).to.equal(0);
    expect(stash.balance.silver).to.equal(8);
    expect(stash.balance.copper).to.equal(5);
  });

  it('should withdrawal all copper, silver, gold and some platinum when we need more copper than copper pieces available', () => {
    const initialBalance: Money = {
      platinum: 2,
      gold: 2,
      silver: 0,
      copper: 0
    };

    const withdrawal: Money = {
      platinum: 0,
      gold: 0,
      silver: 20,
      copper: 1000
    };

    const stash = new Stash(initialBalance);
    stash.withdrawal(withdrawal);

    expect(stash.balance.platinum).to.equal(1);
    expect(stash.balance.gold).to.equal(0);
    expect(stash.balance.silver).to.equal(0);
    expect(stash.balance.copper).to.equal(0);
  });
});
