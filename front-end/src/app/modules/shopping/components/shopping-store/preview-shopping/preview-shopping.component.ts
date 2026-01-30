import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Classifier } from 'app/modules/configuration/models/classifier';
import { StoreProviderComponent } from 'app/modules/provider/pages/provider-gestionary/store-provider/store-provider.component';
import { ProviderService } from 'app/modules/provider/services/provider.service';
import { shoppingProductDetail } from 'app/modules/shopping/models/shoppingProductDetail';
import { ShoppingService } from 'app/modules/shopping/services/shopping.service';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';
import { environment } from 'environments/enviroments';
import { map, Observable, startWith } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-preview-shopping',
    templateUrl: './preview-shopping.component.html',
    styleUrls: ['./preview-shopping.component.scss']
})
export class PreviewShoppingComponent {
    form: FormGroup;
    options: any[] = [];
    myDate = new Date();
    listWarehouse: any[];
    detailParsed: shoppingProductDetail[] = [];
    filteredOptions: Observable<string[]>;
    orderNote: any;
    logoClient = environment.logo;
    buttondisabled :boolean = false
    constructor(private dialogRef: MatDialogRef<any>,
        private providerService: ProviderService,
        private serviceWarehouse: WarehouseService,
        private router: Router,
        public dialog: MatDialog,
        private service: ShoppingService,
        @Inject(MAT_DIALOG_DATA) data,
        private fb: FormBuilder) {
        this.orderNote = data;
        if(this.orderNote.total <= 0){ 
          this.buttondisabled = true
        }
        this.form = this.fb.group({
            id: [null],
            myControl: ['', [Validators.required]],
            providerId: [1, [Validators.required]],
            WarehouseId: [null, [Validators.required]],
            discount: [0],
            amount: [0],
            amountTotal: [null],
            note: [null],
            search: [''],

        });

        this.providerService.getListProvider().subscribe((ele: any) => {
            this.options = ele;
        });
        this.serviceWarehouse.getAllWarehouse().subscribe((response: Classifier[]) => {
            this.listWarehouse = response;
        });

        this.filteredOptions = this.form.get('myControl').valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
        );
        this.setValuesDefault();
    }

    setValuesDefault() {
        this.form.get('amountTotal').setValue(this.orderNote.total);
    }

    cleanSearch() {
        this._filter('');
        this.form.get('myControl').setValue('');
    }


    setListProvider() {
        this._filter('');
        this.form.get('myControl').setValue('');
    }

    addClient() {
        const dialogRef = this.dialog.open(StoreProviderComponent, {
            panelClass: 'custom-container',
            maxHeight: '80vh',
            width: '450px',
            data: { id: null },
        });

        dialogRef.afterClosed().subscribe(result => {
            this.options.push(result);
            let nameComplet = result?.businessName + ' - ' + result.firstName + ' ' + result.lastName;
            this.form.get('myControl').setValue(nameComplet);
            this.form.get('providerId').setValue(result?.id);
        });
    }

    close() {
        this.dialogRef.close(true);
    }

    // private _filter(value: any): any[] {
    //     debugger;
    //     value = (value?.businessName) ? value?.businessName : value;
    //     const filterValue = value.toLowerCase();
    //     return this.options.filter(option => option?.businessName.toLowerCase().includes(filterValue));
    // }

    private _filter(value: any): any[] {
        value = value?.businessName ? value.businessName : value;
        const filterValue = value ? value.toLowerCase() : '';
        return this.options.filter(option => {
            return option?.businessName?.toLowerCase().includes(filterValue);
        });
    }
    
    onSelectionChange(select: any) {
        this.form.get('myControl').setValue(select?.option?.value?.businessName + ' ' + select?.option?.value?.firstName + ' ' + select?.option?.value?.lastName);
        this.form.get('providerId').setValue(select?.option?.value?.id);
    }

    private isValidForm(): boolean {
        let values = this.form.controls;
        Object.keys(this.form.controls).forEach((field) => {
            const control = this.form.get(field);
            control?.markAsTouched({ onlySelf: true });
        });
        return this.form.valid;
    }

    calculateSubTotal() {
        let total = this.orderNote.total;
        let discount = parseFloat(this.form.get('discount')?.value);
        let newValueTotal = total - discount;
        this.form.get('amountTotal').setValue(newValueTotal);

    }

    saveShopping() {
        if (this.isValidForm()) {
            this.buttondisabled = true
            let data = this.form.value;
            this.parseDataDetail();
            data.detail = this.detailParsed;
            data.amountTotal = this.orderNote?.total;
            data.amount = data.amountTotal - data.discount;
            delete data.search;
            this.service.store(data).subscribe((resp) => {
                this.close();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Su compra se realizo con exito!',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.router.navigate(['shopping/shopping']);
            }), (err) => {
                this.buttondisabled = false
                let tmp = err;
            };

        }
    }


    control(key: string): FormControl {
        return this.form.controls[key] as FormControl;
    }

    parseDataDetail() {
        let detail: [] = this.orderNote.detailProduct;
        for (let index = 0; index < detail.length; index++) {
            const element = this.orderNote.detailProduct[index];
            var item: shoppingProductDetail = {
                productId: element?.id,
                amount: element?.count,
                priceShopping: element?.price,
                discount: element?.discount,
                expirationDate: element?.expirationDate,
                unitMeasurementId: element?.unitMeasurementSelect?.id,
                subTotal: element?.subTotal
            };
            this.detailParsed.push(item)
        }
    }

}
