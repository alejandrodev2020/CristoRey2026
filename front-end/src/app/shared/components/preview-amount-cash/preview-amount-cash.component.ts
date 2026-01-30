import { Component, EventEmitter, Input, Output, Self } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Configuration } from 'app/modules/configuration/models/configuration.model';
import { OverviewQrCodeComponent } from 'app/modules/sale/components/overview-qr-code/overview-qr-code.component';

@Component({
  selector: 'preview-amount-cash',
  templateUrl: './preview-amount-cash.component.html',
  styleUrls: ['./preview-amount-cash.component.scss']
})
export class PreviewAmountCashComponent {

    @Output() formChanged = new EventEmitter<any>(); // Emite el objeto completo del formulario
    @Output() keyUpEvent: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
    @Output() enterPressed: EventEmitter<void> = new EventEmitter<void>();

    form: FormGroup;
    previousAmountMain: number | null = null; // Cambiado a null
    private updating: boolean = false;
    label: string = '';
    icon: string = '';
    amountMain: number  | null = null;
    phoneNumber: number  | null = null;
    configuration: Configuration;
    showCash: boolean = false;
    showQr : boolean = false ;
    showCard : boolean = false;

    
    onChange = (value: any) => {};
    onTouched = () => {};

    constructor(@Self() public ngControl: NgControl, private fb: FormBuilder,  public dialog: MatDialog) {


        const configuration = localStorage.getItem('configuration');
        this.configuration = JSON.parse(configuration);
        if (configuration) {
                this.showCash = this.configuration.paymentTypeCash;    
                this.showQr = this.configuration.paymentTypeQr;    
                this.showCard = this.configuration.paymentTypeCard;    
        }



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


    @Input('amountMain')
    set amountMainInput(val: number |  null) {
        this.amountMain = val;
        this.form.get('amountMain')?.setValue(val);
    }

    @Input('phoneNumber')
    set phoneNumberInput(val: number |  null) {
        this.phoneNumber = val;
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

    selectOnlyPayment(control : string){
        this.form.get('amountCash')?.setValue(0);
        this.form.get('amountQr')?.setValue(0);
        this.form.get('amountCard')?.setValue(0);
        const amountMain = this.form.get('amountMain')?.value;
        this.form.get(control)?.setValue(amountMain);
        if(control === 'amountQr'){
            this.previewCodeQr();
        }
        this.formChanged.emit(this.form.value);
    }

    previewCodeQr(){
        // let amountEnd= (this.saleCredit)?this.amountPaymentDelivered:this.orderNote.total;
        // let clientId = this.form.get('clientId').value;
        // let client = this.options.filter((ele)=>(ele.id === clientId))[0];
        const dialogRef = this.dialog.open(OverviewQrCodeComponent, {
          autoFocus: false,
          maxHeight: '90vh',
          data : null
        });

        dialogRef.afterClosed().subscribe(result => {
        });
      }

    private toFloatValues(value: any): any {
        return {
            amountMain: parseFloat(value.amountMain) || null,
            amountCash: parseFloat(value.amountCash) || null,
            amountQr: parseFloat(value.amountQr) || null,
            amountCard: parseFloat(value.amountCard) || null
        };
    }

    onKeyUpEvent(event: any) {
        const value =  (event.target as HTMLInputElement).value;
        this.onChange(value); // Llama a onChange aquí

        // if (this.validateEmptySpaces(value)) {
        //     this.control.setErrors({ 'space': true });
        // } else {
        //     this.control.setErrors(null); // Limpia errores si no hay problemas
        // }

        // if (this.minLength && value.length < this.minLength) {
        //     this.control.setErrors({
        //         minlength: { requiredLength: this.minLength, actualLength: value.length }
        //     });
        // }

        // if (this.maxLength && value.length > this.maxLength) {
        //     this.control.setErrors({
        //         maxlength: { requiredLength: this.maxLength, actualLength: value.length }
        //     });
        // }

        // if (this.control.valid) {
        //     this.control.setErrors(null);
        // } else {
        //     this.control.markAsTouched();
        // }
    }
    onKeyUp(event: KeyboardEvent): void {
        this.keyUpEvent.emit(this.form.value);
        this.formChanged.emit(this.form.value);
    }


}
