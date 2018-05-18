import {TestBed, inject} from '@angular/core/testing';

import {MarketService, MarketServiceImpl} from './market.service';
import {HttpClientModule} from '@angular/common/http';

describe('MarketService', () => {
  let marketService: MarketServiceImpl;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MarketServiceImpl]
    });
    marketService = TestBed.get(MarketServiceImpl);
  });

  it('should be created', inject([MarketServiceImpl], (service: MarketServiceImpl) => {
    expect(service).toBeTruthy();
  }));

  it('MarketService created', () => {
    expect(marketService).toBeDefined();
  });

  it('Service has 6 stocks', function (done) {
    setTimeout(() => {
      expect(marketService.getStocks().length).toEqual(6);
      done();
    }, 1000);
  }, 2000);

  it('Service has OKKO stock', function (done) {
    setTimeout(
      () => {
        const OKK = 'OKK';
        const foundStock = marketService.getStocks()
          .map(stock => stock.getSymbol())
          .find(smb => smb === OKK);
        expect(foundStock).toEqual(OKK);
        done();
      }, 500);
  }, 1000);
});
