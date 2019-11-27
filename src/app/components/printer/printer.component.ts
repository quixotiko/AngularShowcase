import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import * as _ from 'lodash';
import { filter, map, scan } from 'rxjs/operators';

@Component({
  selector: 'app-printer',
  templateUrl: './printer.component.html',
  styleUrls: ['./printer.component.less']
})
export class PrinterComponent implements OnInit {

  words: string = '';
  wordsNeedToBePrinted: string = '我的梦幻是流萤 点点灵动的毫光 在黑暗中熠熠闪烁 The voice of wayside pansies,that do not attract the careless glance,murmurs in these desultory lines.';
  printer$: Observable<string> = interval(150)
    .pipe(
      filter((index) => {
        return index < this.wordsNeedToBePrinted.length;
      }),
      map((index) => {
        return this.wordsNeedToBePrinted[index];
      }),
      scan((acc, cur) => {
        return acc + cur;
      }, '')
    );

  constructor() { }

  ngOnInit() {
    
  }

}
