import {Component,Self,EventEmitter,Input,Output,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, Validators} from '@angular/forms';
/**
 * Componente que encapsula el comportamiento de entrada numérico.
 * Recibe un número(data) en formato string y verifica si es un número entero valido
 * retorna el número en formato string, por lo que debe combertise a tipo number 
 * antes de enviarlo al Back-End usar la siguiente directiva: 
 *        DecimalNumberDirective.decimalStringToParseFloat(data)
 * 
 * @example
 * <number-input
 *  [formControl]="control('name')"
 *  placeholder="Ingrese valor numérico"
 *  (onKeyUp)="onKeyUp($event)"
 *  (onBlur)="onBlur($event)"
 * ></number-input>
*/
@Component({
  selector: 'input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent  implements ControlValueAccessor {
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  placeholderValue: string = 'Ingrese valor numérico';
  disabled: boolean = false;
  isNegative:boolean=false;

  /**
   * Texto que se mostrara en el input cuando se encuentre vacio
   */
  @Input()
  set placeholder(value: string) {
    this.placeholderValue = value;
  }

  @Output() onBlur = new EventEmitter<string>();
  @Output() onKeyUp = new EventEmitter<any>();

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

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
  onBlurEvent(event: any) {
    this.onBlur.emit(event.target.value.trim());
  }

  /*
   * Evento se emite cuando presiona una tecla input
   */
  onKeyUpEvent(event: any) {
   const value = event.target.value;
   this.initValidators(value);
    if (!this.isValidNumber(value)) {
      this.ngControl.control?.setErrors({ invalid: true });
      this.control.setErrors({
        invalidNumber: true,
      });
    } else {
      this.onChange(value);
      this.onKeyUp.emit(value);
    }
  }

  showErrors(): string {
    let response = '';

    if (this.ngControl.invalid) {
      if (this.ngControl.errors !== null) {
        if (this.ngControl.errors['required']) {
          response += 'Obligatorio<br>';
        }
        if (this.ngControl.errors['min']) {
          let item = this.ngControl.errors['min'];
          response += `Número introducido debe ser mayor o igual a ${item.min}<br>`;
        }
        if (this.ngControl.errors['max']) {
          let item = this.ngControl.errors['max'];
          response += `Número introducido debe ser menor o igual a ${item.max}<br>`;
        }
        if (this.ngControl.errors['invalidNumber']) {
          response += 'Debe ingresar un número entero válido<br>';
        }
        if (this.ngControl.errors['maxlength']) {
          let item = this.ngControl.errors['maxlength'];
          response += `Máximo ${this.isNegative ? item.requiredLength-1 :item.requiredLength} dígitos<br>`;
        }
      }
    }
    return response;
  }

  initValidators(value: string){
    this.isNegative = value.startsWith('-');
    const maxCharacterLimit = this.isNegative ? 11 : 10;
    const existingValidations = this.control?.validator;
    const combinedValidations = Validators.compose([existingValidations, Validators.maxLength(maxCharacterLimit)]);
    this.control?.setValidators(combinedValidations);
  }

  isValidNumber(value: string): boolean {
    if (value === "") {
      return true;
    }
    const numPattern = /^-?\d+$/; 
    return numPattern.test(value);
  }

}
