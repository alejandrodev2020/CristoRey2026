import { Component, Input } from '@angular/core';

@Component({
  selector: 'btn-generic-square',
  templateUrl: './btn-generic-square.component.html',
  styleUrls: ['./btn-generic-square.component.scss']
})
export class BtnGenericSquareComponent {

  
   
  color: string = 'green';
  label: string = 'value';
  icon: string = 'value';
  withFull: boolean = false;

  @Input('color')
  set item1(val: any) {
    this.color = val;
  }

  @Input('label')
  set item2(val: any) {
      this.label = val;
  }

  
  @Input('icon')
  set item3(val: any) {
      this.icon = val;
  }

  @Input('withFull')
  set item4(val: any) {
      this.withFull = val;
  }

  constructor(){

  }
}
