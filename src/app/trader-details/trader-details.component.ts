import {Component, OnInit} from '@angular/core';
import {Trader} from '../domain/Trader';
import {TradersService} from '../traders/traders.service';
import {Trade} from '../domain/Trade';
import {MarketService, MarketServiceImpl} from '../market/market.service';

@Component({
  selector: 'app-trader-details',
  templateUrl: './trader-details.component.html',
  styleUrls: ['./trader-details.component.css']
})
export class TraderDetailsComponent implements OnInit {
  trader: Trader;
  private countInput: number;
  private symbolInput: string;

  constructor(private traderService: TradersService, private marketService: MarketServiceImpl) {
    this.trader = new Trader('');
  }

  ngOnInit() {
    this.traderService.getTrader('Oleg').then(trader => this.trader = trader);
  }

  buyStock() {
    const trade: Trade = this.marketService.buyStock(this.symbolInput, this.countInput);
    if (!trade) {
      alert(`symbol ${this.symbolInput} not found`);
      return;
    }
    this.trader.addToPortfolio(trade);
    this.symbolInput = '';
  }
}
