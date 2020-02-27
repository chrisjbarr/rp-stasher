import 'mocha';
import { expect } from 'chai';

import { Currency, Denomination } from '../src/currency';

describe('Currency', () => {
  it('should be created correctly with given values', () => {
    const onHand = 10;
    const denomination: Denomination = { name: 'test-denomination', value: 100 };

    const expectedValue = onHand * denomination.value;

    const currency = new Currency(denomination, onHand);

    expect(currency.denomination).to.eql(denomination);
    expect(currency.amount).to.equal(onHand);

    expect(currency.value).to.equal(expectedValue);
  });
});
