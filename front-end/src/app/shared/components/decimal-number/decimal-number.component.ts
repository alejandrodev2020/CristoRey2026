import { Component, EventEmitter, Input, OnInit, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
/**
 * @example
 * <decimal-number
 *[formControl]="control('decimal2')" 
 *[numberInt]="18"   
 *[numberDecimal]="6" 
 *[required]="true">
 *</decimal-number>
 * 
 * 'numberInt' debe ser mayor que 'numberDecimal', 
 * ya que 'numberInt' es la cantidad de dígitos permitidos
 * al cual se le restan los números decimales permitidos
 * y el valor resultante no puede ser menor a 1
 */

@Component({
  selector: 'decimal-number',
  templateUrl: './decimal-number.component.html',
  styleUrls: ['./decimal-number.component.scss']
})
export class DecimalNumberComponent implements OnInit,  ControlValueAccessor {
  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };
  disabled = false;
  typeValue = 'text';
  placeholderValue = '';
  numberDecimal:number=6;
  numberInt:number =16;
  isNegativeValue!:boolean;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  /**
   * Tipo de input que se usura text|password|email|number
   */
  @Input()
  set type(value: string) {
    this.typeValue = value;
  }

  /**
   * Texto que se mostrara en el input cuando se encuentre vacio
   */
  @Input()
  set placeholder(value: string) {
    this.placeholderValue = value;
  }
  /**
   * indicador de cantidad de números total con enteros y decimales
   */
  
  @Input('numberInt')
  set prop001(value:number){
    this.numberInt =value;

  }
  /**
 * Cantidad de decimales
 */
  @Input('numberDecimal')
  set prop002(value: number) {
    this.numberDecimal = value;
  }

  /**
   * indicador para aceptar números negativos
    */
  @Input('isNegativeValue')
  set prop003(value: boolean) {
      this.isNegativeValue = value;
  }

  ngOnInit(): void {}

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /*
   * Evento se emite cuando pierde el foco el input
   */
  @Output() onBlur = new EventEmitter<any>();
  onBlurEvent(event: any) {
    this.onBlur.emit(this.formatMilToNumber(event.target.value));
  }

  /*
   * Evento se emite cuando presiona una tecla input
   */
  @Output() onKeyUp = new EventEmitter<any>();
  onKeyUpEvent(event: any) {
    this.onKeyUp.emit(this.formatMilToNumber(event.target.value));
  }
  showErrors(): string {
    let response = '';

    if (this.ngControl.invalid) {
      if (this.ngControl.errors !== null) {
        if (this.ngControl.errors['required']) {
          response += 'Obligatorio<br>';
        }
        if (this.ngControl.errors['email']) {
          response += 'Debe ingresar un email válido<br>';
        }
        if (this.ngControl.errors['minlength']) {
          let item = this.ngControl.errors['minlength'];
          response += `Mínimo ${item.requiredLength} caracteres<br>`;
        }
        if (this.ngControl.errors['maxlength']) {
          let item = this.ngControl.errors['maxlength'];
          response += `Máximo ${item.requiredLength} caracteres<br>`;
        }
        if (this.ngControl.errors['min']) {
          let item = this.ngControl.errors['min'];
          response += `Número introducido debe ser mayor a ${item.min}<br>`;
        }
        if (this.ngControl.errors['max']) {
          let item = this.ngControl.errors['max'];
          response += `Número introducido debe ser menor o igual a ${item.max}<br>`;
        }
        if (this.ngControl.errors['regex']) {
          const msg = this.ngControl.errors['regex'];
          response += `${msg}<br>`;
        }
      }
    }

    return response;
  }
  formatMilToNumber(num: string) {
    return String(num).replace(/,/g, '');
  }
}

