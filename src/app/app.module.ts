import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MarketComponent} from './market/market.component';
import {TradersComponent} from './traders/traders.component';
import {RoutingModule} from './routing/routing.module';
import {TradersService} from './traders/traders.service';
import {HttpClientModule} from '@angular/common/http';
import { TraderDetailsComponent } from './trader-details/trader-details.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    MarketComponent,
    TradersComponent,
    TraderDetailsComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [TradersService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
