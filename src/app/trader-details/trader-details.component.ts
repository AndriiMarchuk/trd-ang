import {Component, OnInit, ViewChild} from '@angular/core';
import {Trader} from '../domain/Trader';
import {TradersService} from '../traders/traders.service';
import {Trade} from '../domain/Trade';
import {MarketService, MarketServiceImpl} from '../market/market.service';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, ParamMap, Route, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Location} from '@angular/common';
import {Stock} from "../Stock";
import {StocksComponent} from "./stocks/stocks.component";

@Component({
  selector: 'app-trader-details',
  templateUrl: './trader-details.component.html',
  styleUrls: ['./trader-details.component.css']
})
export class TraderDetailsComponent implements OnInit {
  trader: Trader;
  countInput = new FormControl();
  selectedStock: Stock;
  @ViewChild(StocksComponent)
  private stocksComponent: StocksComponent;

  constructor(private traderService: TradersService, private marketService: MarketServiceImpl
    , private route: ActivatedRoute
    , private router: Router
    , private location: Location) {
    this.trader = new Trader('');
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) =>
        this.traderService.getTrader(params.get('name'))))
      .subscribe((trader: Trader) => this.trader = trader);
  }

  buyStock() {
    if (this.selectedStock == null) {
      window.alert('Please select the stock');
      return;
    }
    const trade: Trade =
      this.marketService.buyStock(this.selectedStock.getSymbol(),
        this.countInput.value);
    this.trader.addToPortfolio(trade);
    this.selectedStock = null;
    this.stocksComponent.clean();
  }

  closeTrade(trade: Trade) {
    this.marketService.closeTrade(trade);
  }

  goBack() {
    this.location.back();
  }

  onStockSelect(stock: Stock) {
    this.selectedStock = stock;
  }
}
