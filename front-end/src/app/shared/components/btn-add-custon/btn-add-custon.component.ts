import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'btn-add-custon',
  templateUrl: './btn-add-custon.component.html',
  styleUrls: ['./btn-add-custon.component.scss']
})
export class BtnAddCustonComponent {
    color: string = 'green';
    label: string = 'value';
    icon: string = 'value';
    path: string = 'assets/icons/add-product.png';

    withFull: boolean = false;
    disabled: boolean = false;
    @Output() buttonClick = new EventEmitter<void>();

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

    @Input('disabled')
    set item5(val: boolean) {
        this.disabled = val;
    }


    @Input('path')
    set item6(val: string) {
        this.path = val;
    }



    constructor(){

    }


    handleClick() {
        if (!this.disabled) {
          this.buttonClick.emit(); // Emite el evento cuando se hace clic
        }
        // Lógica de acción aquí
      }
}
