import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetjsDemoComponent } from './sheetjs-demo.component';

describe('SheetjsDemoComponent', () => {
  let component: SheetjsDemoComponent;
  let fixture: ComponentFixture<SheetjsDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetjsDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetjsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
