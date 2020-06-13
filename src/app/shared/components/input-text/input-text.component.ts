import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }]
})
export class InputTextComponent implements OnInit, ControlValueAccessor {

  inputValue: string;
  onChange: (value) => void;
  onTouched: () => void;

  @Input()
  label: string;

  constructor() { }

  writeValue(value: string): void {
    this.inputValue = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setInputValue(value: string){
    this.inputValue = value;
    this.onChange(this.inputValue);
  }

  ngOnInit(): void {
  }

}
