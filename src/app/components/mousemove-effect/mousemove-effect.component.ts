import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent, interval } from 'rxjs';
import { map, sampleTime, take } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-mousemove-effect',
  templateUrl: './mousemove-effect.component.html',
  styleUrls: ['./mousemove-effect.component.less'],
  animations: [
    trigger('bubbleAnimation',[
      transition(':enter',[
        style({
          opacity: 0.6,
          transform: 'scale(0.1)'
        }),
        animate('1s', style({
          opacity: 1,
          transform: 'scale(1)'
        }))
      ]),
      transition(':leave',[
        animate('3s', style({
          opacity: 0,
          transform: 'scale(2)'
        }))
      ])
    ])
  ]
})
export class MousemoveEffectComponent implements OnInit {

  @ViewChild('container', {static: true}) c: ElementRef;
  container: HTMLDivElement;
  bubbles: {x: number, y: number}[] = [];

  // mousePosition$: Observable<{x: number, y: number}> = fromEvent(this.container, 'mousemove').pipe(
  //   map((e: MouseEvent) => {
  //     return {
  //       x: e.clientX,
  //       y: e.clientY
  //     }
  //   }),
  //   distinct(),
  //   debounceTime(200)
  // )

  constructor() { }

  ngOnInit() {
    this.container = this.c.nativeElement;
    const  mousePosition$: Observable<{x: number, y: number}> = fromEvent(this.container, 'mousemove').pipe(
      map((e: MouseEvent) => {
        let mouseInfo = {
          x: e.clientX,
          y: e.clientY,
          bdColor: 'rgb(' + Math.random()* 255 + ',' + Math.random()* 255 + ',' + Math.random()* 255 + ')',
          isVisible: true
        }
        interval(500).pipe(take(2)).subscribe((i) => {//通过interval在1秒(interval函数将在0.5秒后发射第一个值)后将bubble设为不可见，通过模板的ngif指令将其从dom中移除
          if(i === 1)
          {
            mouseInfo.isVisible = false;
          }
        })
        return mouseInfo;
      }),
      // debounceTime(200),//debounceTime,数据流中两个相邻的数据的时间间隔大于给定值时才会把后面发射的数据给发射出来，所以一连串时间间隔小于给定值的数据都不会发射出来
      sampleTime(50)//sampleTime是以给定时间间隔从数据流里面取样，而不在乎数据流的每个数据之间的时间间隔
    );

    mousePosition$.subscribe((position) => {
      this.bubbles.push(position);
      console.log(this.bubbles);
    })
  }

}
