import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export function maxDigitsValidator(maxDigits: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null; // Si no hay valor, no valida.
    
    const valueString = control.value.toString();
    if (valueString.length > maxDigits) {
      return { maxDigits: { value: control.value } };
    }
    return null;
  };
}
