import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-payment-type',
  templateUrl: './card-payment-type.component.html',
  styleUrls: ['./card-payment-type.component.scss']
})
export class CardPaymentTypeComponent {
  type: string = 'green';
  active: boolean = false;

  @Input('type')
  set item1(val: any) {
    this.type = val;
  }

  @Input('active')
  set item2(val: any) {
      this.active = val;
  }
  
}
