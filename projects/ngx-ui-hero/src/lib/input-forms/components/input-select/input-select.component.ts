import { Component, Input, ViewChild, Optional, Inject, OnInit } from '@angular/core';

import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';

import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ElementBase } from '../../base/element-base';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';
import { InputFormsConfig } from '../../input-forms-config';

let identifier = 0;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'input-select',
  templateUrl: './input-select.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputSelectComponent,
    multi: true
  }]
})
export class InputSelectComponent extends ElementBase<string> implements OnInit {
  @Input() public displayTextProperty: string;
  @Input() public valueProperty: string;
  @Input() public defaultOption: string;
  @Input() public options: Array<any>;

  @ViewChild(NgModel) model: NgModel;

  public identifier = `input-select-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    @Inject( INPUT_FORMS_CONFIG ) public config: InputFormsConfig
  ) {
    super(validators, asyncValidators, config);
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (this.value === null) {
        this.writeValue('');
      }
    }, 0);
  }

  OnValueChanged(): void {}

  getOptionDisplayText(option: any): string {
    const prop = this.displayTextProperty || 'displayText';
    return option[prop];
  }
  getOptionValue(option: any): string {
    const prop = this.valueProperty || 'value';
    return option[prop];
  }
}