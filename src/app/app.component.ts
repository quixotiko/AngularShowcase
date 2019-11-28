import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'AngularShowcase';
  showcase: string[];

  constructor() {
    this.showcase = [
      "AngularShowcase",
      "infiniteScroll",
      "mousemoveEffect",
      "printer",
      "ripple"
    ]
  }
}
