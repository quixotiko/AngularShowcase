import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, BehaviorSubject, Observable, fromEvent, range, merge} from 'rxjs';
import {distinct, filter, map, debounceTime, tap, mergeMap, toArray, delay, flatMap} from 'rxjs/operators';
import * as _ from 'lodash';//npm install @types/lodash --save-dev


@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.less']
})


export class InfiniteScrollComponent implements OnInit {

  @ViewChild('scrollArea' ,{ static: true}) s: ElementRef;//获取外层父元素
  // cache: {index: number}[][] = [];
  scrollArea: HTMLDivElement;
  cache: any = [];
  itemHeight: number = 100;
  itemWidth: number;
  numberOfItems: number = 10;
  loading: boolean = false;

  boxStyle = {
    'height': this.itemHeight + 'px',
    'width': this.itemHeight + 'px'
  }

  pageByManual$: Subject<number> = new BehaviorSubject<number>(1);
  pageByScroll$: Observable<number> = fromEvent(window, "scroll")
  .pipe(
    map(() => window.scrollY),
    tap(() => {
      // console.log(this.scrollArea.clientHeight);
      // console.log(window.innerHeight);
      // console.log(window.scrollY);
    }),
    filter((y) => y >= this.scrollArea.clientHeight - window.innerHeight),//这里不是body.clientHeight!!
    distinct(),
    debounceTime(200),
    map((y) => {
      return Math.ceil((y + window.innerHeight) / (this.itemHeight * this.numberOfItems))
      
    })
  );
  // pageByResize$: Observable<number> = fromEvent(window, "resize")
  // .pipe(
  //   debounceTime(200),
  //   map(() => {
  //     return Math.ceil((window.innerHeight + document.body.scrollTop) / (this.itemHeight + this.numberOfItems))
  //   })
  // )

  pageToLoad$: Observable<number> = merge(this.pageByManual$,this.pageByScroll$).pipe(//这里之前报错是因为merge的引用位置错误了
    distinct(),
    filter((page: number) => this.cache[page-1] === undefined)
  )

  itemResults$: Observable<{index: number}[]> = this.pageToLoad$
  .pipe(
    tap((page) => {
      this.loading = true;
      console.log(page);
    }),
    flatMap((page) => {
      return range((page-1)*10+1,10).pipe(//range第二个参数是个数
        map((n) => {
          return {
            index: n,
            bgColor: 'rgb(' + Math.random()* 255 + ',' + Math.random()* 255 + ',' + Math.random()* 255  + ')'
          }
        }),
        toArray(),
        delay(1000),
        tap((array) => {
          console.log(array);
          this.cache[page-1] = array;
          if(this.itemHeight * this.numberOfItems * page < window.innerHeight )
          {
            this.pageByManual$.next(page + 1);
          }
        })
      )
    }),
    map(() => _.flatten(this.cache))
  )


  constructor() { 
   
  }

  ngOnInit() {
    this.scrollArea = this.s.nativeElement;
  }

}
