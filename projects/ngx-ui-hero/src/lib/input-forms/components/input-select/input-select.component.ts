import { Component, DoCheck, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

import { ElementBase } from '../../base/element-base';
import { InputFormsConfig } from '../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';

let identifier = 0;

@Component({
  selector: 'input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputSelectComponent,
    multi: true
  }]
})
export class InputSelectComponent extends ElementBase<any> implements OnInit, DoCheck {
  @Input() public displayTextProperty: string;
  @Input() public valueProperty: string;
  @Input() public defaultOption: string;
  @Input() public options: Array<any>;

  @ViewChild(NgModel, {static: true}) model: NgModel;

  public identifier = `input-select-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    @Inject( INPUT_FORMS_CONFIG ) public config: InputFormsConfig
  ) {
    super(validators, asyncValidators, config);
  }

  ngOnInit(): void {
    setTimeout(()=> {
      this.handleInitialValue();
    });
  }
  ngDoCheck(): void {
    this.handleInitialValue();
  }

  getOptionDisplayText(option: any): string {
    const prop = this.displayTextProperty || 'displayText';
    return option[prop];
  }
  getOptionValue(option: any): string {
    const prop = this.valueProperty || 'value';
    return option[prop];
  }

  private handleInitialValue(): void {
    if (this.value != undefined && this.value != null) {
      this.value = this.value.toString();
    } else {
      this.writeValue('');
    }
  }
}
