import 'mocha';
import { expect } from 'chai';

import { Stash } from '../src/stash';
import { Currency, Denomination, Money } from '../src/currency';

describe('Platinum Currency', () => {
  it('should translate to copper exactly', () => {
    const currency = new Currency(1, Denomination.Platinum);

    const expectedResult = {
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: 1000
    };

    const result = currency.convert(Denomination.Copper);
    expect(result).to.eql(expectedResult);
  });

  it('should translate to silver exactly', () => {
    const currency = new Currency(1, Denomination.Platinum);

    const expectedResult = {
      platinum: 0,
      gold: 0,
      silver: 100,
      copper: 0
    };

    const result = currency.convert(Denomination.Silver);
    expect(result).to.eql(expectedResult);
  });

  it('should translate to gold exactly', () => {
    const currency = new Currency(1, Denomination.Platinum);

    const expectedResult = {
      platinum: 0,
      gold: 10,
      silver: 0,
      copper: 0
    };

    const result = currency.convert(Denomination.Gold);
    expect(result).to.eql(expectedResult);
  });

  it('should translate to platinum exactly', () => {
    const currency = new Currency(1, Denomination.Platinum);

    const expectedResult = {
      platinum: 1,
      gold: 0,
      silver: 0,
      copper: 0
    };

    const result = currency.convert(Denomination.Platinum);
    expect(result).to.eql(expectedResult);
  });
});

describe('Gold Currency', () => {
  it('should translate to copper exactly', () => {
    const currency = new Currency(1, Denomination.Gold);

    const expectedResult = {
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: 100
    };

    const result = currency.convert(Denomination.Copper);
    expect(result).to.eql(expectedResult);
  });

  it('should translate to silver exactly', () => {
    const currency = new Currency(1, Denomination.Gold);

    const expectedResult = {
      platinum: 0,
      gold: 0,
      silver: 10,
      copper: 0
    };

    const result = currency.convert(Denomination.Silver);
    expect(result).to.eql(expectedResult);
  });

  it('should translate to gold exactly', () => {
    const currency = new Currency(1, Denomination.Gold);

    const expectedResult = {
      platinum: 0,
      gold: 1,
      silver: 0,
      copper: 0
    };

    const result = currency.convert(Denomination.Gold);
    expect(result).to.eql(expectedResult);
  });
});

describe('Silver Currency', () => {
  it('should translate to copper exactly', () => {
    const currency = new Currency(1, Denomination.Silver);

    const expectedResult = {
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: 10
    };

    const result = currency.convert(Denomination.Copper);
    expect(result).to.eql(expectedResult);
  });

  it('should translate to silver exactly', () => {
    const currency = new Currency(1, Denomination.Silver);

    const expectedResult = {
      platinum: 0,
      gold: 0,
      silver: 1,
      copper: 0
    };

    const result = currency.convert(Denomination.Silver);
    expect(result).to.eql(expectedResult);
  });
});

describe('Copper Currency', () => {
  it('should translate to copper exactly', () => {
    const currency = new Currency(1, Denomination.Copper);

    const expectedResult = {
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: 1
    };

    const result = currency.convert(Denomination.Copper);
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
