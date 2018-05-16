import { TestBed, inject } from '@angular/core/testing';

import { TradersService } from './traders.service';

describe('TradersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TradersService]
    });
  });

  it('should be created', inject([TradersService], (service: TradersService) => {
    expect(service).toBeTruthy();
  }));
});
