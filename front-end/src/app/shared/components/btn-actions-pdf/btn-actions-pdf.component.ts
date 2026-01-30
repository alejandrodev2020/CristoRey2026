import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'btn-actions-pdf',
  templateUrl: './btn-actions-pdf.component.html',
  styleUrls: ['./btn-actions-pdf.component.scss']
})


/**
 * This is a hello world function.
 * @author Favian Alejandro Avila Mancilla
 * @version 1.0.0
 * @param {string} color - A string param
 * @param {string} label - A string param
 * @param {string} icon - A string param
 * @param {string} with - A string param
 * @param {string} disabled - A boolean param
 * @example
 *  <btn-actions-pdf
 *     [color]="'green'"
 *     [label]="'Aceptar'"
 *     [icon]="'save'"
 *     [withFull]="true"
 *     [disabled]="false"
 *     (buttonClick)="save()";
 *   >
 *  </btn-actions-pdf>
 */



export class BtnActionsPdfComponent {


    color: string = 'green';
    label: string = 'value';
    icon: string | null = null;
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



    constructor(){

    }

    handleClick() {
      if (!this.disabled) {
        this.buttonClick.emit(); // Emite el evento cuando se hace clic
      }
      // Lógica de acción aquí
    }
  }
