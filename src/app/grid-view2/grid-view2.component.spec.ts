import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridView2Component } from './grid-view2.component';

describe('GridView2Component', () => {
  let component: GridView2Component;
  let fixture: ComponentFixture<GridView2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridView2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
