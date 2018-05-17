import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MarketServiceImpl} from '../../market/market.service';
import {FormControl} from '@angular/forms';
import {Stock} from '../../Stock';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockInput = new FormControl();
  filteredStocks: Observable<Stock[]>;
  stocks: Stock[];
  selected: Stock;

  @Output()
  onStockSelect = new EventEmitter<Stock>();

  constructor(private marketService: MarketServiceImpl) {
  }

  ngOnInit() {
    this.stocks = this.marketService.getStocks();
    this.filteredStocks = this.stockInput.valueChanges
      .pipe(
        startWith(null)
        , map(val => val ? this.filter(val) : this.stocks.slice()));
    this.stockInput.valueChanges
      .pipe(
        startWith(null),
        map(symbol => {
          const stock = this.findStock(symbol);
          if (stock != null) {
            this.selected = stock;
            this.onStockSelect.emit(stock);
          } else {
            this.selected = null;
          }
        })).subscribe();
  }

  filter(val: string): Stock[] {
    return this.stocks.filter(stock => new RegExp(`^${val}`, 'gi')
      .test(stock.getSymbol()));
  }

  findStock(symbol: string): Stock {
    return this.stocks.find(stock => symbol === stock.getSymbol());
  }

  clean() {
    this.stockInput.setValue('');
    this.selected = null;
  }
}
