import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, isFormRecord, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreClassifierComponent } from 'app/modules/configuration/components/store-classifier/store-classifier.component';
import { Classifier } from 'app/modules/configuration/models/classifier';
import { ConfigurationService } from 'app/modules/configuration/services/configuration.service';
import { OptionsService } from 'app/modules/options/services/options.service';
import { image } from 'app/modules/product/models/image-default.const';
import { Product } from 'app/modules/product/models/product';
import Swal from 'sweetalert2';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: any[] = [];
@Component({
  selector: 'app-store-tratament',
  templateUrl: './store-tratament.component.html',
  styleUrls: ['./store-tratament.component.scss']
})
export class StoreTratamentComponent  implements OnInit {

    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = ELEMENT_DATA;
    form: FormGroup;
    id: number | null = null;
    optionId: number | null = null;
    listCategories: Classifier[];
    listUnitMeasurement: Classifier[];
    listEquivalence: any[];
    isSaving: boolean = false;
    isCreate = false;
    selectUnitmeasurementName: string = '';
    imgBase64: any;
    imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(image);
    productTemporary: Product | null = null;
    prop = [
        "id",
        "title",
        "description",
        "code",
        "suggestedPriceShopping",
        "suggestedPriceSale",
        "requiredExpired",
        "productCategoryId",
        "unitMeasurementId"
    ];
    get formLabel() {
        return this.isCreate ? 'Regístro' : 'Actualización';
    }
    constructor(private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private sanitizer: DomSanitizer,
        private service: OptionsService,
        public dialog: MatDialog,
        private serviceConfiguration: ConfigurationService) {
        this.form = this.fb.group({
            id: [null],
            optionId: [null],
            picture: [null],
            title: [null, [Validators.required]],
            description: [null, [Validators.required]],
            code: [null, [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.isCreate = this.router.url.endsWith('/store');
        this.optionId = parseInt(this.activatedRoute.snapshot.params['optionId']);
        this.id = parseInt(this.activatedRoute.snapshot.params['tratamentId']);
        if (!this.isCreate) {
            this.form.get('unitMeasurementId')?.disable();
            this.service.getDiasnosticById(this.id).subscribe((response: any) => {
                this.productTemporary = response;
                this.prop.forEach((key) => this.form.get(key)?.setValue(response[key]));
                if (response.picture !== null) {
                    let path = 'data:image/png;base64,' + response.picture;
                    this.setPhoto(path);
                }
            });

        }
        else {
            this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(image);
            this.form.get('unitMeasurementId')?.enable();
        }
    }

    onFocusNameInput() {
        const currentValue = this.form.get('name')?.value;
    }
    control(key: string): FormControl {
        return this.form.controls[key] as FormControl;
    }

    addUnitMeasurenment() {
        const dialogRef = this.dialog.open(StoreClassifierComponent, {
            data: {
                id: null,
                classifier: 'Unidad de Medida',
                pathClassifier: 'unit-measurement'
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.selectUnitmeasurement(result);
            }
        });
    }

    addCategory() {
        const dialogRef = this.dialog.open(StoreClassifierComponent, {
            data: {
                id: null,
                classifier: 'Categoria',
                pathClassifier: 'product-category'
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.selectCategory(result);
            }
        });
    }

    save(): void {
        let messaje = (this.isCreate) ? 'Registro' : 'Actualización';
        if (this.isValidForm()) {
            let data: Product = this.form.value;
            data.optionId = this.optionId;
            if(!this.isCreate)
            {
                data.unitMeasurementId = this.productTemporary.unitMeasurementId;
            }
            this.isSaving = true
            this.service.storeTratament(data).subscribe((resp) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Su ' + messaje + 'se realizo con exito!',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.router.navigate(['options']);
            });
        }
    }

    private isValidForm(): boolean {
        let values = this.form.controls;
        Object.keys(this.form.controls).forEach((field) => {
            const control = this.form.get(field);
            control?.markAsTouched({ onlySelf: true });
        });
        return this.form.valid;
    }

    async uploadAvatar(fileList: FileList) {
        if (!fileList.length) {
            return;
        }
        const allowedTypes = ['image/jpeg', 'image/png'];
        const file = fileList[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.setPhoto(reader.result);
        };
    }

    async setPhoto(data: any) {
        this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(data);
        this.form.get('picture').setValue(data);
    }

    removeAvatar(): void {
        this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(image);
        this.form.get('picture').setValue(null);
    }

    async selectUnitmeasurement(data: any) {
        await this.serviceConfiguration.getAllUnitMeasurement().subscribe((response: Classifier[]) => {
            this.listUnitMeasurement = response;
            let unitMeasurementSelect = this.listUnitMeasurement.filter((ele) => ((ele.id === data.value || ele.id === data.id)));
            this.selectUnitmeasurementName = unitMeasurementSelect[0].name;
            this.form.get('unitMeasurementId')?.setValue(data.id || data.value);
        });

    }

    async selectCategory(data: any) {
        await this.serviceConfiguration.getAllProductCategory().subscribe((response: Classifier[]) => {
            this.listCategories = response;
            // let unitMeasurementSelect = this.listUnitMeasurement.filter((ele) => ((ele.id === data.value || ele.id === data.id)));
            // this.selectUnitmeasurementName = unitMeasurementSelect[0].name;
            this.form.get('productCategoryId')?.setValue(data.id || data.value);
        });
    }

    cancelStore() {
        this.router.navigate(['options']);
    }

    gestionaryEquivalences() {
        this.router.navigate(['product/product/equivalence/'+ this.id]);
    }

}
