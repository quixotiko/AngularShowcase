import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MousemoveEffectComponent } from './mousemove-effect.component';

describe('MousemoveEffectComponent', () => {
  let component: MousemoveEffectComponent;
  let fixture: ComponentFixture<MousemoveEffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MousemoveEffectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MousemoveEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
