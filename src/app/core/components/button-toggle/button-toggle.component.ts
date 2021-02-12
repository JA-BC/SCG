import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TPairs } from 'src/app/core/interfaces/type';

@Component({
  selector: 'ion-button-toggle',
  templateUrl: './button-toggle.component.html'
})
export class ButtonToggleComponent implements OnInit {

  @Input()
  values: string[] | TPairs<string | number>[] = [];

  readonly radioBtnName = `radioBtn_${Math.trunc(Math.random() * 100) + 1}`;

  private _value: string | number;

  @Output()
  valueChange = new EventEmitter<string | number>();

  @Input()
  get value(): string | number {
    return this._value;
  }

  set value(v: string | number) {
    this._value = v;
    this.valueChange.emit(this._value);
  }

  constructor() {}

  ngOnInit() { }

}