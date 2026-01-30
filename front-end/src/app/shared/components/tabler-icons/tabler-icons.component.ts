import { Component, Input } from '@angular/core';

@Component({
  selector: 'tabler-icons',
  templateUrl: './tabler-icons.component.html',
  styleUrls: ['./tabler-icons.component.scss']
})
export class TablerIconsComponent {
  /** Título que se mostrará en la tarjeta. */
  icon: string = 'none';

  /** Etiqueta que se mostrará en la tarjeta. */
  width: string | number = 'none';

  /** Etiqueta para ver el esado. */
  active: boolean = false;

  /**
   * Establece el título de la tarjeta.
   * @param {string} val - El título a mostrar.
   */
  @Input('icon')
  set item1(val: string) {
    this.icon =  `assets/icons/tabler/${val}.svg` ;
  }

  /**
   * Establece la etiqueta de la tarjeta.
   * @param {string} val - La etiqueta a mostrar.
   */
  @Input('width')
  set item2(val: string | number) {
      this.width = val;
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
