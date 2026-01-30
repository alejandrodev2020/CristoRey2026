import { Component, Input } from '@angular/core';

@Component({
  selector: 'chips-faam',
  templateUrl: './chips-faam.component.html',
  styleUrls: ['./chips-faam.component.scss']
})
export class ChipsFaamComponent {

  color: string = 'green';
  label: string = 'value';

  @Input('color')
  set item1(val: any) {
    this.color = val;
  }

  @Input('label')
  set item2(val: any) {
      this.label = val;
  }

  constructor(){

  }

  
}
