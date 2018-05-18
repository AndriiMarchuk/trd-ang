import {TestBed, inject} from '@angular/core/testing';

import {TradersService} from './traders.service';
import {Trader} from "../domain/Trader";

describe('TradersService', () => {
  const traderService: TradersService = new TradersService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TradersService]
    });
  });

  it('should be created', inject([TradersService], (service: TradersService) => {
    expect(service).toBeTruthy();
  }));

  it('Traders exist', () => {
    expect(traderService.getTradersInstant()).toBeDefined();
  });
  it('There are 2 traders', () => {
    expect(traderService.getTradersInstant().length).toEqual(2);
  });
  it('First is Oleg', () => {
    expect(traderService.getTradersInstant()[0].getName()).toEqual('Oleg');
  });
  it('Second is Anna', () => {
    expect(traderService.getTradersInstant()[1].getName()).toEqual('Anna');
  });
  it('Third is Olga', () => {
    traderService.add('Olga');
    expect(traderService.getTradersInstant()[2].getName()).toEqual('Olga');
  });
  it('First Promise is Oleg', (done) => {
    const expectedName = 'Oleg';
    traderService.getTrader(expectedName)
      .then(trader => {
          expect(trader.getName()).toEqual(expectedName);
          done();
        }
      )
      .catch(e => fail(e))
    ;
  }, 200);
});
