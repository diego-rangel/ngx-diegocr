import { Component, OnInit } from '@angular/core';
import { DataGridColumnModel, EnumAlignment } from 'ngx-ui-hero';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {
  inputTextCode = `
<input-text 
  [label]="'My Label here'" 
  [placeholder]="'My placeholder...'" 
  [maxlength]="200" 
  [disabled]="false"   
  [showValidations]="true"
  [(ngModel)]="myModel" 
  required>
</input-text>
  `;
  
  inputEmailCode = `
<input-email
  [label]="'My E-mail'" 
  [placeholder]="'My placeholder...'" 
  [maxlength]="200" 
  [disabled]="false"   
  [showValidations]="true"
  [(ngModel)]="myEmailModel" 
  required>
</input-email>
  `;

  inputSelectCode = `
<input-select
  [label]="'My Label'" 
  [defaultOption]="'Select'" 
  [disabled]="false"   
  [showValidations]="true"
  [(ngModel)]="mySelectModel" 
  [options]="options"
  [displayTextProperty]="'text'"
  [valueProperty]="'value'"
  required>
  <!-- You can add your options as a template too -->
</input-select>
  `;

  inputSelectCode2 = `
<input-select
  [label]="'My Label 2'" 
  [defaultOption]="'Select'" 
  [disabled]="false"
  [(ngModel)]="mySelectModel">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</input-select>
  `;

  inputTextAreaCode = `
<input-textarea 
  [label]="'My Label'" 
  [placeholder]="'My placeholder...'" 
  [maxlength]="2000" 
  [disabled]="false"   
  [showValidations]="true"
  [(ngModel)]="myTextAreaModel" 
  required>
</input-textarea>
  `;

  checkboxCode = `
<input-checkbox 
  [label]="'My checkbox Label'" 
  [disabled]="false"
  [(ngModel)]="myCheckboxModel">
</input-checkbox>
  `;

  radioCode = `
<input-radio 
  [label]="'My radio 1'" 
  [disabled]="false"
  [name]="'radioOptions'" 
  [radioValue]="1" 
  [(ngModel)]="myRadioModel">
</input-radio>
<input-radio 
    [label]="'My radio 2'" 
    [disabled]="false"
    [name]="'radioOptions'" 
    [radioValue]="2" 
    [(ngModel)]="myRadioModel">
</input-radio>
  `;

  currencyCode = `
<input-currency 
  [label]="'My Label'" 
  [disabled]="false"   
  [showValidations]="true"
  [(ngModel)]="myCurrencyModel" 
  required>
</input-currency>
  `;

  percentCode = `
<input-percent 
  [label]="'My Label'" 
  [disabled]="false"   
  [showValidations]="true"
  [(ngModel)]="myPercentModel" 
  required>
</input-percent>
  `;

  numberCode = `
<input-number
  [label]="'My Label'" 
  [disabled]="false"   
  [maxValue]="100"
  [minValue]="0"
  [showValidations]="true"
  [(ngModel)]="myNumberModel" 
  required>
</input-number>
  `;

  dateCode = `
<input-date
  [label]="'My Label'" 
  [disabled]="false"
  [showValidations]="true"
  [(ngModel)]="myDateModel" 
  required>
</input-date>
  `;

  myModel: string;
  myEmailModel: string;
  myTextAreaModel: string;
  mySelectModel: any = '';
  myCheckboxModel: boolean;
  myRadioModel: any;
  myCurrencyModel: any;
  myPercentModel: any;
  myNumberModel: any;
  myDateModel: any;
  myDatagridModel: Array<any>;
  datagridColumns: Array<DataGridColumnModel> = [
    {
      caption: 'Name',
      data: 'name',
    },
    {
      caption: 'E-mail',
      data: 'email'
    },
    {
      caption: 'Status',
      captionAlignment: EnumAlignment.Center,
      data: 'active',
      dataAlignment: EnumAlignment.Center,
      width: '200px'
    }
  ];

  options = [
    { value: 1, text: 'Option 1' },
    { value: 2, text: 'Option 2' }
  ];

  constructor() { }

  ngOnInit() {
    this.myDatagridModel = [
      {
        name: 'Diego da Cunha Rangel',
        email: 'my-email@domain.com',
        active: true
      },
      {
        name: 'Foo',
        email: 'my-email@domain.com',
        active: true
      },
      {
        name: 'Baar',
        email: 'my-email@domain.com',
        active: false
      }
    ];
  }

}