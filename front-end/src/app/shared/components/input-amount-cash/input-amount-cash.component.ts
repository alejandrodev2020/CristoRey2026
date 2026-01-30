import { Component, EventEmitter, Input, OnInit, Self, ChangeDetectorRef, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';

@Component({
  selector: 'input-amount-cash',
  templateUrl: './input-amount-cash.component.html',
  styleUrls: ['./input-amount-cash.component.scss']
})

/**
 * @example
 *
 *  <input-amount-cash
      [icon]="'add'"
      [label]="'Monto de Dinero Inicio:'"
      [formControlName]="'amountInit'">
    </input-amount-cash>
 */

export class InputAmountCashComponent implements ControlValueAccessor, OnInit {

    @Output() enterPressed: EventEmitter<void> = new EventEmitter<void>();
    form: FormGroup;
    previousAmountMain: number | null = null; // Cambiado a null
    private updating: boolean = false;
    label: string = '';
    icon: string = '';
    onChange = (value: any) => {};
    onTouched = () => {};

    constructor(@Self() public ngControl: NgControl, private fb: FormBuilder) {
        this.ngControl.valueAccessor = this;
        this.form = this.fb.group({
            amountMain: [null, Validators.required],
            amountCash: [null],
            amountQr: [null],
            amountCard: [null]
        });

        // this.previousamountMain = this.form.get('amountMain')?.value || 0;

        this.form.get('amountMain')?.valueChanges.subscribe(value => {
            this.updateDetails();
        });
        this.form.get('amountCash')?.valueChanges.subscribe(value => {
            this.updateDetails();
        });

        this.form.get('amountQr')?.valueChanges.subscribe(value => {
            this.updateDetails();
        });

        this.form.get('amountCard')?.valueChanges.subscribe(value => {
            this.updateDetails();
        });

        this.form.valueChanges.subscribe(value => {
            this.onChange(this.toFloatValues(value)); // Convertir a float
        });
    }

    @Input('label')
    set itemLabel(val: string | null) {
        this.label = val;
    }

    @Input('icon')
    set itemIcon(val: string) {
        this.icon = val;
    }

    ngOnInit() {}

    writeValue(value: any): void {
        if (value) {
            this.form.patchValue(this.toFloatValues(value));
        } else {
            this.form.reset(); // Resetea a null si no hay valor
        }
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    onInputChange() {
        // Esto ya se maneja con valueChanges
    }

    control(key: string): FormControl {
        return this.form.controls[key] as FormControl;
    }

    onKeyUp(event: any) {
        // Implementar lógica adicional si es necesario
    }

    onEnter(): void {
        this.enterPressed.emit();
    }

    updateDetails() {
        if (this.updating) return;

        this.updating = true;

        const amountMain = this.form.get('amountMain')?.value;

        if (amountMain !== this.previousAmountMain) {
            this.form.get('amountCash')?.setValue(amountMain);
            this.form.get('amountQr')?.setValue(null); // Cambiado a null
            this.form.get('amountCard')?.setValue(null); // Cambiado a null
        } else {
            const amountQr = this.form.get('amountQr')?.value || 0;
            const amountCard = this.form.get('amountCard')?.value || 0;

            const amountCash = amountMain - amountQr - amountCard;
            this.form.get('amountCash')?.setValue(amountCash);
        }

        this.previousAmountMain = amountMain;

        this.updating = false;
    }

    isActive(control : string): boolean {
        return this.form.get(control)?.value > 0;
    }

    private toFloatValues(value: any): any {
        return {
            amountMain: parseFloat(value.amountMain) || null,
            amountCash: parseFloat(value.amountCash) || null,
            amountQr: parseFloat(value.amountQr) || null,
            amountCard: parseFloat(value.amountCard) || null
        };
    }
}
