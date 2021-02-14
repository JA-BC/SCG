import { Component, OnInit, Input, forwardRef, Output, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TPairs } from 'src/app/core/interfaces/type';

const BUTTON_TOGGLE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ButtonToggleComponent),
    multi: true
};

@Component({
  selector: 'ion-button-toggle',
  templateUrl: './button-toggle.component.html',
  providers: [BUTTON_TOGGLE_VALUE_ACCESSOR]
})
export class ButtonToggleComponent implements OnInit {

  @Input()
  values: string[] | TPairs<string | number>[] = [];

  readonly radioBtnName = `radioBtn_${Math.trunc(Math.random() * 100) + 1}`;

  onChange: Function = (_: any) => { };

  onTouched: Function = () => { };

  isDisabled: boolean;

  private _value: string | number;

  @Input()
  get value(): string | number {
    return this._value;
  }

  set value(v: string | number) {
    this._value = v;
    this.onChange(this._value);
  }

  constructor() {}

  ngOnInit() { }

  writeValue(value: string | number): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(state: boolean) {
    this.isDisabled = state;
  }

  onButtonChange(value: string | number) {
    this.value = value;
    this.onTouched();
  }

}
