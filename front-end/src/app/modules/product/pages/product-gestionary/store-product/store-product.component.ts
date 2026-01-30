import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, isFormRecord, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreClassifierComponent } from 'app/modules/configuration/components/store-classifier/store-classifier.component';
import { Classifier } from 'app/modules/configuration/models/classifier';
import { ConfigurationService } from 'app/modules/configuration/services/configuration.service';
import { PreviewQuestionsUnitmeasurementComponent } from 'app/modules/product/components/preview-questions-unitmeasurement/preview-questions-unitmeasurement.component';
import { image } from 'app/modules/product/models/image-default.const';
import { Product } from 'app/modules/product/models/product';
import { ProductService } from 'app/modules/product/services/product.service';
import { maxDigitsValidator } from 'app/shared/directives/maxDigitsValidator';
import Swal from 'sweetalert2';



export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: any[] = [];

@Component({
    selector: 'app-store-product',
    templateUrl: './store-product.component.html',
    styleUrls: ['./store-product.component.css']
})
export class StoreProductComponent implements OnInit {

    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = ELEMENT_DATA;
    form: FormGroup;
    id: number | null = null;
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
        "name",
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
        private service: ProductService,
        public dialog: MatDialog,
        private serviceConfiguration: ConfigurationService) {
        this.form = this.fb.group({
            id: [null],
            picture: [null],
            name: [null, [Validators.required]],
            description: [null, [Validators.required]],
            code: [null, [Validators.required]],
            productCategoryId: [null, [Validators.required]],
            unitMeasurementId: [null, [Validators.required]],
            suggestedPriceShopping: [null, [Validators.required ,maxDigitsValidator(15),Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
            suggestedPriceSale: [null, [Validators.required,maxDigitsValidator(15),Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
            requiredExpired: [false, null],
        });
    }

    ngOnInit(): void {
        this.isCreate = this.router.url.endsWith('/store');
        if (!this.isCreate) {
            this.form.get('unitMeasurementId')?.disable();
            this.id = parseInt(this.activatedRoute.snapshot.params['id']);
            this.service.getById(this.id).subscribe((response: any) => {
                this.productTemporary = response;
                (response?.hasEquivalences && this.setEquivalences());
                this.prop.forEach((key) => this.form.get(key)?.setValue(response[key]));
                if (response.picture !== null) {
                    let path = 'data:image/png;base64,' + response.picture;
                    this.setPhoto(path);
                }
                if (response.category != null) {
                    let data = {
                        value: response.category
                    }
                    this.form.get('unitMeasurementId')?.setValue(response.category.id);
                    this.form.get('unitMeasurementId')?.setValue(response.unitMeasurement.id);
                }
            });

        }
        else {
            this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(image);
            this.form.get('unitMeasurementId')?.enable();
        }
        this.getAllCategory();
        this.getAllUnitMeasurement();
    }

    onFocusNameInput() {
        const currentValue = this.form.get('name')?.value;
    }
    control(key: string): FormControl {
        return this.form.controls[key] as FormControl;
    }
    getAllCategory() {
        this.serviceConfiguration.getAllProductCategory().subscribe((response: Classifier[]) => {
            this.listCategories = response;
        });
    }

    getAllUnitMeasurement() {
        this.serviceConfiguration.getAllUnitMeasurement().subscribe((response: Classifier[]) => {
            this.listUnitMeasurement = response;
        });
    }
    setEquivalences() {
        this.service.getAllProductEquivalence(this.id).subscribe((equivalences: any[]) => {
            this.listEquivalence = equivalences;
            this.dataSource = equivalences;
        });
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
            data.id = this.id;
            if(!this.isCreate)
            {
                data.unitMeasurementId = this.productTemporary.unitMeasurementId;
            }
            this.isSaving = true
            this.service.store(data).subscribe((resp) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Su ' + messaje + 'se realizo con exito!',
                    showConfirmButton: false,
                    timer: 1500
                });

                if (this.isCreate) {
                    const dialogRef = this.dialog.open(PreviewQuestionsUnitmeasurementComponent, {
                        data: {
                            id: resp,
                            unitmeasurementDefault: this.form.get('unitMeasurementId').value
                        },
                        disableClose: true,
                        maxWidth: '500px'
                    });
                    dialogRef.afterClosed().subscribe(result => {
                        let tes = result;
                    });
                }
                else {
                    this.router.navigate(['product/product']);
                }
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
        this.router.navigate(['product/product']);
    }

    gestionaryEquivalences() {
        this.router.navigate(['product/product/equivalence/'+ this.id]);
    }

}
