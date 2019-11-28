import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfiniteScrollComponent } from './components/infinite-scroll/infinite-scroll.component';
import { MousemoveEffectComponent } from './components/mousemove-effect/mousemove-effect.component';
import { HomeComponent } from './components/home/home.component';
import { PrinterComponent } from './components/printer/printer.component';
import { RippleComponent } from './components/ripple/ripple.component';

@NgModule({
  declarations: [
    AppComponent,
    InfiniteScrollComponent,
    MousemoveEffectComponent,
    HomeComponent,
    PrinterComponent,
    RippleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
