import {Trade} from "./Trade";

export class Trader {
  private portfolio: Trade[];

  constructor(private name: string) {
    this.portfolio = [];
  }

  addToPortfolio(trade: Trade) {
    this.portfolio.push(trade);
  }

  getPortfolio(): Trade[] {
    return this.portfolio;
  }

  getName(): string {
    return this.name;
  }

  getUnreleasedPnL(): number {
    return this.getRoundedPnL(0);
  }

  getTotalPnL(): number {
    return this.getRoundedPnL(this.getReleasedPnL() + this.getUnreleasedPnL());
  }

  getOpenTrades(): Trade[] {
    return this.portfolio.filter(trade => trade.isOpen);
  }

  getClosedTrades(): Trade[] {
    return this.portfolio.filter(trade => !trade.isOpen);
  }

  private getRoundedPnL(pnl: number): number {
    return Math.round(pnl * 100 + Number.EPSILON) / 100;
  }

  getReleasedPnL(): number {
    let pnl = 0;
    for (const trade of this.portfolio) {
      pnl += trade.getReleasedPnL();
    }
    return this.getRoundedPnL(pnl);
  }

  getUnReleasedPnL(): number {
    let pnl = 0;
    for (const trade of this.portfolio) {
      if (!trade.isOpen) {
        pnl += trade.getUnreleasedPnL();
      }
    }
    return this.getRoundedPnL(pnl);
  }

  getTotalPnl(): number {
    return this.getRoundedPnL(this.getReleasedPnL() + this.getUnReleasedPnL());
  }
}
