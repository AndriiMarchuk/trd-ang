import {MarketService} from './market/market.service';
import {Stock} from './Stock';

describe('Stock tests with spying', () => {
  let marketServiceSpy: MarketService;
  let stock: Stock;

  beforeEach(() => {
    marketServiceSpy = {
      getPrice(symbol: string): number {
        return 0;
      },
      getUpdatedPrice(currentPrice: number): number {
        return 0;
      },
      getStocks(): Stock[] {
        return [];
      },
      addStock(symbol: string, company: string) {
      }
    };
    spyOn(marketServiceSpy, 'getPrice');
    spyOn(marketServiceSpy, 'getUpdatedPrice');
  });

  it('Stock calls getPrice', () => {
    stock = new Stock('OKK', 'OKKO', marketServiceSpy);
    expect(marketServiceSpy.getPrice).toHaveBeenCalledTimes(1);
  });
})
