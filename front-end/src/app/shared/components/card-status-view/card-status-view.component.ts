import { Component, Input } from '@angular/core';




@Component({
  selector: 'card-status-view',
  templateUrl: './card-status-view.component.html',
  styleUrls: ['./card-status-view.component.scss']
})
export class CardStatusViewComponent {
  type: string = 'green';
  active: boolean = false;
  label: string = '';
  imagePath: string = '';

  @Input('type')
  set item1(val: any) {
    this.type = val;
  }

  @Input('active')
  set item2(val: any) {
      this.active = val;
  }

  @Input('label')
  set item3(val: string) {
      this.label = val;
  }

  @Input('imagePath')
  set item4(val: string) {
      this.imagePath =  `assets/images/ui/${val}`;
  }
  
}
