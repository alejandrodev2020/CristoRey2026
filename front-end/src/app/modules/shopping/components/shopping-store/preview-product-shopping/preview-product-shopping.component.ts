import { Component, ElementRef, Inject, OnInit, ViewChild,ChangeDetectorRef, AfterViewInit, ChangeDetectionStrategy  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'app/modules/product/models/product';
import { ProductService } from 'app/modules/product/services/product.service';
import { maxDigitsValidator } from 'app/shared/directives/maxDigitsValidator';
import Swal from 'sweetalert2';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-preview-product-shopping',
    templateUrl: './preview-product-shopping.component.html',
    styleUrls: ['./preview-product-shopping.component.scss']
})
export class PreviewProductShoppingComponent implements OnInit , AfterViewInit {
    form: FormGroup;
    product: Product;
    picture: string;
    isNew: boolean= false;
    isValidData: boolean = true;
    activeAlert: boolean = false;
    listUnitMeasurement: any[];
    UnitMeasurementCheck: any;
    message: string = '';

    @ViewChild('aForm2') aForm2: ElementRef;
    @ViewChild('countInput', { static: true }) countInput: ElementRef;
    @ViewChild('suggestedPrice') suggestedPrice: ElementRef;
    @ViewChild('discount') discount: ElementRef;
    @ViewChild('expired') expired: ElementRef;
    @ViewChild('birthdayDatepicker') birthdayDatepicker!: MatDatepicker<Date>;

    constructor(private dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) data,
        private service: ProductService,
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef) {
        this.product = data.data;
        this.picture = data?.data?.picture;
        this.isNew = data.isNew;
        this.form = this.fb.group({
            id: [null],
            suggestedPrice: [null, [Validators.required,Validators.maxLength(15)]],
            count: [null, [Validators.required,Validators.maxLength(15)]],
            picture: [null],
            discount: [null,[Validators.maxLength(15)]],
            requiredExpired: [null],
            expirationDate:[null],
            subTotal: [null, [Validators.required]],
        });
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            if (this.isNew) {
                this.setEquivalences();
            }
            else {
                this.setValueExisting(this.product);
            }

            if (this.product.requiredExpired) {
                 this.form.get('expirationDate')?.setValidators([Validators.required]);
            } else {
                 this.form.get('expirationDate')?.clearValidators();
            }
            this.form.get('expirationDate')?.updateValueAndValidity();
            this.cdr.detectChanges();
          }, 0);
    }
    ngOnInit(): void {
    }

    setEquivalences() {
        this.service.getAllProductEquivalence(this.product.id).subscribe((resp: any[]) => {
            setTimeout(() => {
                this.listUnitMeasurement = resp;
                this.listUnitMeasurement.forEach(item => {
                    if (item.unitMeasurementMotiveId === this.product?.unitMeasurement?.id) {
                        item.checkDefault = true;
                        this.UnitMeasurementCheck = item;
                    }
                });
                this.setValueCost();
                this.setValuesDefault(this.product);
            });
        });
    }

    setValueCost() {
        this.form.get('suggestedPrice').setValue(this.UnitMeasurementCheck?.suggestedPricePurchase);
        this.calculateSubTotal();
    }

    setValuesDefault(product: Product) {
        this.form.get('id').setValue(product?.id);
        this.form.get('suggestedPrice').setValue(product?.suggestedPriceShopping);
        this.form.get('count').setValue(1);
        this.form.get('picture').setValue(product?.picture);
        this.form.get('discount').setValue(0);
        this.form.get('requiredExpired').setValue(product.requiredExpired);
        this.form.get('subTotal').setValue(product?.suggestedPriceShopping);
    }

    setValueExisting(data: any) {
        this.form.get('id').setValue(data?.id);
        this.form.get('suggestedPrice').setValue(data?.price);
        this.form.get('count').setValue(data?.count);
        this.form.get('discount').setValue(data?.discount);
        this.form.get('subTotal').setValue(data?.subTotal);
        this.form.get('requiredExpired').setValue(data.requiredExpired);
        this.form.get('expirationDate').setValue(data.expirationDate);
        this.setUnitMeasurementDefault(data?.unitMeasurementSelect?.id);
    }

    setUnitMeasurementDefault(id: number) {
        this.service.getAllProductEquivalence(this.product.id).subscribe((resp: any[]) => {
            this.listUnitMeasurement = resp;
            this.listUnitMeasurement.forEach(item => {
                if (item.unitMeasurementMotiveId === id) {
                    item.checkDefault = true;
                    this.UnitMeasurementCheck = item;
                }
            });
            this.cdr.detectChanges();
 
        });
    } 

    addQuantity(currentItem: any) {   
        this.listUnitMeasurement.map((item) => {
            if (item.unitMeasurementMotive.name === currentItem.unitMeasurementMotive.name) {
                item.checkDefault = true;
                this.UnitMeasurementCheck = item;
                this.setValueCost();
                this.cdr.detectChanges();
                item.checkDefault = false;
            } else {
                item.checkDefault = false;
            }
        });
    }

    close() {
        this.form.reset();
        this.dialogRef.close(true);
    }

    validateStockAvailable() {
        let count = parseFloat(this.form.get('count').value);
        let available = this.product?.amount;
        if (count > available) {
            this.message = 'Stock Disponible : ' + available;
            this.isValidData = false;
        }
        else {
            this.message = '';
            this.isValidData = true;
        }
    }

    calculateSubTotal() {
        this.validateStockAvailable();
        let suggestedPrice = parseFloat(this.form.get('suggestedPrice').value);
        let count = parseFloat(this.form.get('count').value);
        let discount = parseFloat(this.form.get('discount').value);
        suggestedPrice = isNaN(suggestedPrice) ? 0 : suggestedPrice;
        count = isNaN(count) ? 0 : count;
        discount = isNaN(discount) ? 0 : discount;
        let subTotal = (suggestedPrice * count) - discount;
        this.form.get('subTotal').setValue(subTotal);

    }

    handleKeyDown(event: KeyboardEvent, nextInput?: string) {
        if ((event.key === 'Enter' || event.code === 'Enter') || (event.key === 'Escape' || event.code === 'Escape')) {
            event.preventDefault();
            this.onFocus(nextInput);
        }
    }

    onFocus(value: string) {
        const actions = {
            save: () => this.save(),
            close: () => this.close(),
            countInput: () => this.countInput.nativeElement.focus(),
            suggestedPrice: () => this.suggestedPrice.nativeElement.focus(),
            discount: () => this.discount.nativeElement.focus(),
            expired: () => {
                if (this.product.requiredExpired) {
                    this.expired.nativeElement.focus();
                } else {
                    this.save();
                }
            }
        };

        const action = actions[value];
        if (action) {
            action();
        } else {
            console.warn(`No action defined for value: ${value}`);
        }
    }

    openDatepicker() {
        this.birthdayDatepicker.open();
    }

    save(): void {
        this.activeAlert = false;
        if (!this.form.valid) {
            Object.keys(this.form.controls).forEach((field) => {
                const control = this.form.get(field);
                control?.markAsTouched();
            });
        }
        else {
            if (this.isValidData) {
                let data = this.form.value;
                data.unitMeasurement = this.product.unitMeasurement;
                data.unitMeasurementSelect = this.UnitMeasurementCheck.unitMeasurementMotive;
                data.price = data.suggestedPrice;
                data.picture = this.product.picture;
                data.name = this.product?.name;
                data.description = this.product?.description;
                this.dialogRef.close(data);
                this.form.reset();
            }
            else {
                const ele = this.aForm2.nativeElement['count'];
                if (ele) {
                    ele.focus();
                    this.activeAlert = true;
                }
            }
        }

    }

}
