import { Component, EventEmitter, Input, Self, ChangeDetectorRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
    selector: 'input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent implements ControlValueAccessor, OnInit {
    label: string | null = null;
    placeholder: string = 'placeholder';
    icon: string ;
    minLength?: number;
    maxLength?: number;
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
        // this.cdr.detectChanges(); // Llama a detectChanges aquí solo si es necesario
    }

    onBlurEvent(event: any) {
        this.onTouched();
    }

    onKeyUpEvent(event: any) {
        const value =  (event.target as HTMLInputElement).value;
        this.onChange(value); // Llama a onChange aquí

        if (this.validateEmptySpaces(value)) {
            this.control.setErrors({ 'space': true });
        } else {
            this.control.setErrors(null); // Limpia errores si no hay problemas
        }

        if (this.minLength && value.length < this.minLength) {
            this.control.setErrors({
                minlength: { requiredLength: this.minLength, actualLength: value.length }
            });
        }

        if (this.maxLength && value.length > this.maxLength) {
            this.control.setErrors({
                maxlength: { requiredLength: this.maxLength, actualLength: value.length }
            });
        }

        if (this.control.valid) {
            this.control.setErrors(null);
        } else {
            this.control.markAsTouched();
        }
    }

    validateCharCodeAt(data: string): boolean {
        return data.trim().length === 0;
    }
    validateEmptySpaces(data: string): boolean {
        return !data.trim();
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
