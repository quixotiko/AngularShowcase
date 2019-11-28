import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfiniteScrollComponent } from './components/infinite-scroll/infinite-scroll.component';
import { MousemoveEffectComponent } from './components/mousemove-effect/mousemove-effect.component';
import { HomeComponent } from './components/home/home.component';
import { PrinterComponent } from './components/printer/printer.component';
import { RippleComponent } from './components/ripple/ripple.component';


const routes: Routes = [
  {
    path: 'AngularShowcase',
    component: HomeComponent
  },
  {
    path: 'infiniteScroll',
    component: InfiniteScrollComponent
  },
  {
    path: 'mousemoveEffect',
    component: MousemoveEffectComponent
  },
  {
    path: 'printer',
    component: PrinterComponent
  },
  {
    path: 'ripple',
    component: RippleComponent
  },
  {
    path: '',
    redirectTo: '/AngularShowcase',
    pathMatch: "full"
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
