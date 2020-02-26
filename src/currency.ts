export class Platinum {
  count: number = 0;

  constructor(initialCount = 0) {
    this.count = initialCount;
  }

  get asGold() {
    return this.count * 10;
  }

  get asSilver() {
    return this.count * 100;
  }

  get copperWorth() {
    return this.count * 1000;
  }
}

export class Gold {
  count: number = 0;

  constructor(initialCount = 0) {
    this.count = initialCount;
  }

  get asSilver() {
    return this.count * 10;
  }

  get copperWorth() {
    return this.count * 100;
  }
}

export class Silver {
  count: number = 0;

  constructor(initialCount = 0) {
    this.count = initialCount;
  }

  get copperWorth() {
    return this.count * 10;
  }
}

export class Copper {
  count: number = 0;

  constructor(initialCount = 0) {
    this.count = initialCount;
  }

  get copperWorth() {
    return this.count;
  }
}
