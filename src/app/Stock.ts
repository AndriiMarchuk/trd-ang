export class Stock {
  private price: number;
  constructor(private symbol: string, private company: string) {
    this.price = this.getRoundedPrice();
  }

  getSymbol(): string {
    return this.symbol;
  }

  getCompany(): string {
    return this.company;
  }

  getPrice(): number {
    return this.price;
  }

  private getRoundedPrice(): number {
    return Math.round((Math.random() * 1000 * this.symbol.length) * 100 +
      Number.EPSILON) / 100;
  }
}
