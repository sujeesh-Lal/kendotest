import { Component, OnInit, Input } from '@angular/core';
import { forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custominput',
  templateUrl: './custominput.component.html',
  styleUrls: ['./custominput.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustominputComponent),
      multi: true
    }
  ]
})
export class CustominputComponent implements ControlValueAccessor {
  constructor() { }

  val = '';
  set value(val) {
    if (val !== undefined && this.val !== val) {
      this.val = val;
      this.onChange(val);
      this.onTouch(val);
    }

  }


  onChange: any = () => { };
  onTouch: any = () => { };

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

}
