import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  // ...
} from '@angular/animations';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-ripple',
  templateUrl: './ripple.component.html',
  styleUrls: ['./ripple.component.less'],
  animations: [
    trigger('rippleAnimation', [
      state('inactive', style({
        width: 0,
        height: 0
      })),
      state('activated', style({
        width: 0,
        height: 0
      })),
      transition('inactive <=> activated', [
        style({
          width: 10 + 'px',
          height: 10 + 'px',
        }),
        animate('0.5s', keyframes([
          style({
            transform: 'scale(0)',
            opacity: 0,
            // offset: 0
          }),
          style({
            transform: 'scale(4)',
            opacity: 0.5,
            // offset: 0.2
          }),
          style({
            transform: 'scale(30)',
            opacity: 0,
            // offset: 1
          }),
        ]))
      ])
    ])
  ]
})
export class RippleComponent implements OnInit {

  @ViewChild('button', { static: true }) button: ElementRef;
  @ViewChild('ripple', { static: true }) ripple: ElementRef;

  left: number;
  top: number;
  rippleStyle: {};
  isActive: boolean = false;
  flag: boolean = false;

  constructor() { }

  ngOnInit() {
    // fromEvent(this.button.nativeElement, 'click')
    //   .pipe(
    //     map((e: MouseEvent) => {

    //       return {
    //         // left: e.offsetX + 'px',
    //         // top: e.offsetY + 'px',
    //         left: 100 + 'px',
    //         top: 10 + 'px'
    //       }
    //     }),
    //     distinctUntilChanged(),
    //     debounceTime(200)
    //   ).subscribe((position) => {
    //     console.log('clicked');

    //     if (!this.flag) {
    //       this.isActive = !this.isActive;
    //       console.log(position);
    //       this.rippleStyle = position;
    //       this.flag = true;
    //     }
    //   })//用fromEvent会出现一个问题：当鼠标点击的时间间隔太小会有一个{left：5px, top：5px}的数据输出？
  }
  onAnimationEnd(e: AnimationEvent) {
    this.flag = false;
  }
  handleClick(e: MouseEvent) {
    if (!this.flag) {
      this.left = e.offsetX;
      this.top = e.offsetY;
      this.rippleStyle = {
        left: this.left + 'px',
        top: this.top + 'px'
      }
      this.isActive = !this.isActive;
      this.flag = true;
    }
  }
}
