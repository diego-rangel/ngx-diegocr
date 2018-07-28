import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DebounceDirective } from './directives/debounce.directive';
export { DebounceDirective } from './directives/debounce.directive';

import { AutoSelectOnFocusDirective } from './directives/auto-select-on-focus.directive';
export { AutoSelectOnFocusDirective } from './directives/auto-select-on-focus.directive';

import { CurrencySymbolPipe } from './base/currency-symbol.pipe';
export { CurrencySymbolPipe } from './base/currency-symbol.pipe';

import { CurrencyMaskModule } from "ng2-currency-mask";
import { CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';

import { InputFormsConfig } from './input-forms-config';
export { InputFormsConfig } from './input-forms-config';
import { INPUT_FORMS_CONFIG } from './input-forms-config.constants';

import { InputTextComponent } from './components/input-text/input-text.component';
export { InputTextComponent } from './components/input-text/input-text.component';

import { InputValidationsComponent } from './components/input-validations/input-validations.component';
export { InputValidationsComponent } from './components/input-validations/input-validations.component';

import { InputSelectComponent } from './components/input-select/input-select.component';
export { InputSelectComponent } from './components/input-select/input-select.component';

import { InputEmailComponent } from './components/input-email/input-email.component';
export { InputEmailComponent } from './components/input-email/input-email.component';

import { InputTextareaComponent } from './components/input-textarea/input-textarea.component';
export { InputTextareaComponent } from './components/input-textarea/input-textarea.component';

import { InputCheckboxComponent } from './components/input-checkbox/input-checkbox.component';
export { InputCheckboxComponent } from './components/input-checkbox/input-checkbox.component';

import { InputRadioComponent } from './components/input-radio/input-radio.component';
export { InputRadioComponent } from './components/input-radio/input-radio.component';

import { InputCurrencyComponent } from './components/input-currency/input-currency.component';
export { InputCurrencyComponent } from './components/input-currency/input-currency.component';

import { InputPercentComponent } from './components/input-percent/input-percent.component';
export { InputPercentComponent } from './components/input-percent/input-percent.component';

import { InputNumberComponent } from './components/input-number/input-number.component';
export { InputNumberComponent } from './components/input-number/input-number.component';

import { InputDateComponent } from './components/input-date/input-date.component';
export { InputDateComponent } from './components/input-date/input-date.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CurrencyMaskModule,
  ],
  declarations: [
    AutoSelectOnFocusDirective,
    DebounceDirective,
    CurrencySymbolPipe,
    InputTextComponent,
    InputValidationsComponent,
    InputSelectComponent,
    InputEmailComponent,
    InputTextareaComponent,
    InputCheckboxComponent,
    InputRadioComponent,
    InputCurrencyComponent,
    InputPercentComponent,
    InputNumberComponent,
    InputDateComponent,
  ],
  exports: [
    AutoSelectOnFocusDirective,
    DebounceDirective,
    CurrencySymbolPipe,
    InputTextComponent,
    InputValidationsComponent,
    InputSelectComponent,
    InputEmailComponent,
    InputTextareaComponent,
    InputCheckboxComponent,
    InputRadioComponent,
    InputCurrencyComponent,
    InputPercentComponent,
    InputNumberComponent,
    InputDateComponent,
  ],
})
export class NgxUiHeroInputFormsModule {
  static forRoot(config?: InputFormsConfig): ModuleWithProviders {
    let source = config || {};

    let target: InputFormsConfig = {
      currency: {
        currencyCode: 'USD',
        align: 'right',
        allowNegative: true,
        allowZero: true,
        decimal: '.',
        thousands: ',',
        precision: 2,
        prefix: '',
        suffix: ''
      },
      validationMessages: {
        invalid: '{label} is invalid',
        required: '{label} is required',
        pattern: '{label} is invalid',
        maxlength: 'The filled-in value is greater than the maximum allowed',
        minlength: 'The filled-in value is less than the minimum allowed'
      }
    };

    let result = Object.assign(target, source);

    return {
      ngModule: NgxUiHeroInputFormsModule,
      providers: [
        {
          provide: INPUT_FORMS_CONFIG,
          useValue: result
        },
        {
          provide: CURRENCY_MASK_CONFIG,
          useValue: result.currency
        }
      ]
    };
  }
}