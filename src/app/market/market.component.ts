import {Component, OnInit} from '@angular/core';
import {Stock} from '../Stock';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  stocks: Stock[];

  ngOnInit() {
    this.stocks = this.getMockStocks();
  }

  private getMockStocks(): Stock[] {
    const stocks: Stock[] = [];
    stocks.push(new Stock('BA', 'Boeing'));
    stocks.push(new Stock('CAT', 'Caterpillar'));
    stocks.push(new Stock('KO', 'Coca-Cola'));
    return stocks;
  }

  add(symbol: string, company: string) {
    this.stocks.push(new Stock(symbol, company));
  }
}
