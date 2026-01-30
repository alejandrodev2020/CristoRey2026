import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';

@Component({
  selector: 'input-decimal',
  templateUrl: './input-decimal.component.html',
  styleUrls: ['./input-decimal.component.scss']
})
export class InputDecimalComponent  implements ControlValueAccessor, OnInit {
    @Output() enterPressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();


    label: string | null = null;
    placeholder: string = 'placeholder';
    icon: string;
    minLength?: number;
    maxLength?: number;
    numberDecimal:number =2;
    type: string = 'text';
    disabled: boolean = false;

    // Inicializar las funciones como funciones vacías
    onChange = (value: string) => {};
    onTouched = () => {};

    constructor(@Self() public ngControl: NgControl, private cdr: ChangeDetectorRef) {
        this.ngControl.valueAccessor = this;
    }

    ngOnInit() {
        this.updateDisabledState(this.disabled);
    }

    writeValue(value: string): void {
      if (this.control.value !== value) {
        this.control.setValue(value, { emitEvent: false });
     }
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    get control(): FormControl {
        return this.ngControl.control as FormControl;
    }

    @Input('placeholder')
    set itemPlaceholder(val: string) {
        this.placeholder = val;
    }
    @Input('numberDecimal')
    set prop001(value: string) {
      this.numberDecimal = parseFloat(value);
    }
    @Input('label')
    set itemLabel(val: string | null) {
        this.label = val;
    }

    @Input('icon')
    set itemIcon(val: string) {
        this.icon = val;
    }

    @Input('minLength')
    set itemMinLength(val: number | undefined) {
        this.minLength = val;
    }

    @Input('maxLength')
    set itemMaxLength(val: number | undefined) {
        this.maxLength = val;
    }

    @Input('type')
    set itemType(val: string) {
        this.type = val;
    }

    @Input('disabled')
    set itemDisabled(val: boolean) {
        this.disabled = val;
        this.updateDisabledState(val);
    }

    private updateDisabledState(isDisabled: boolean): void {
        if (isDisabled) {
            this.control.disable();
        } else {
            this.control.enable();
        }
        this.cdr.detectChanges(); // Llama a detectChanges aquí solo si es necesario
    }

    onBlurEvent(event: any) {
        this.onTouched();
    }

    @Output() onKeyUp = new EventEmitter<any>();
    onKeyUpEvent(event: any) {
        if (this.validateCharCodeAt(event.target.value)) {
          this.ngControl.control?.setErrors({ 'invalid': true });
          this.control.setErrors({
            'space': true,
          });
        } else {
          this.onKeyUp.emit(event.target.value.trim());
        }
      }

      onInputChange(event: Event): void {
        const inputValue: string = (event.target as HTMLInputElement).value;
        const validatedValue: string = this.validateDecimal(inputValue, this.numberDecimal);
        (event.target as HTMLInputElement).value = validatedValue;
        this.valueChanged.emit(inputValue);
      }
      private validateDecimal(value: string, decimalPlaces: number): string {
        const numericValue: string = value.replace(/[^\d.]/g, '');
        const parts = numericValue.split('.');
        if (parts.length > 1) {
          parts[1] = parts[1].slice(0, decimalPlaces);
        }
        return parts.join('.');
      }

      validateCharCodeAt(data: string): boolean {
        let dataString = data.split('');
        let count = 0;
        for (let i = 0; i < dataString.length; i++) {
          if (dataString[i].charCodeAt(0) === 32) {
            count++;
          }
        }
        return (count === dataString.length && count !== 0) ? true : false;
      }

    showErrors(): string {
        let response = '';
        if (this.ngControl.invalid && this.ngControl.errors) {
            if (this.ngControl.errors.required) {
                response += 'Obligatorio<br>';
            }
            if (this.ngControl.errors.minlength) {
                const item = this.ngControl.errors.minlength;
                response += `Mínimo ${item.requiredLength} caracteres<br>`;
            }
            if (this.ngControl.errors.maxlength) {
                const item = this.ngControl.errors.maxlength;
                response += `Máximo ${item.requiredLength} caracteres<br>`;
            }
            if (this.ngControl.errors.space) {
                response += `No se permiten solo espacios en blanco<br>`;
            }
        }
        return response;
    }
}
