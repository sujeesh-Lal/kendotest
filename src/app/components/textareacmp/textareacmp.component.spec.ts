import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareacmpComponent } from './textareacmp.component';

describe('TextareacmpComponent', () => {
  let component: TextareacmpComponent;
  let fixture: ComponentFixture<TextareacmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextareacmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareacmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
