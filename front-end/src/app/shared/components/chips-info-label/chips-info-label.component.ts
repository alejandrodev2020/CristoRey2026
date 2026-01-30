import { Component, Input } from '@angular/core';

@Component({
  selector: 'chips-info-label',
  templateUrl: './chips-info-label.component.html',
  styleUrls: ['./chips-info-label.component.scss']
})


/**
 * Componente que representa una tarjeta informativa con un título y una etiqueta.
 * Se utiliza para mostrar información adicional de forma clara y concisa.
 *
 * @example
 * @author Favian Alejandro Avila Mancilla
 * @version 1.0.0
 *
 * <chips-info-label
 *   [title]="'Título de Ejemplo'"
 *   [label]="'Etiqueta de Ejemplo'"
 *   [active]="true"
 * ></chips-info-label>
 */


export class ChipsInfoLabelComponent {
    /** Título que se mostrará en la tarjeta. */
    title: string = 'none';

    /** Etiqueta que se mostrará en la tarjeta. */
    label: string | number = 'none';

    /** Etiqueta para ver el esado. */
    active: boolean = false;

    /**
     * Establece el título de la tarjeta.
     * @param {string} val - El título a mostrar.
     */
    @Input('title')
    set item1(val: string) {
      this.title = val;
    }

    /**
     * Establece la etiqueta de la tarjeta.
     * @param {string} val - La etiqueta a mostrar.
     */
    @Input('label')
    set item2(val: string | number) {
        this.label = val;
    }

    /**
     * Establece la etiqueta de la tarjeta.
     * @param {string} val - La etiqueta a mostrar.
     */
    @Input('active')
    set item3(val: boolean) {
        this.active = val;
    }
  }
