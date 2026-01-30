import { WarehouseMovement } from './../../../models/warehouseMovement';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PettyCash } from 'app/modules/petty-cash/models/petty-cash';
import { ProductService } from 'app/modules/product/services/product.service';
import { FormMovementOnlyItemComponent } from 'app/modules/warehouse/components/warehouse-movement/form-movement-only-item/form-movement-only-item.component';
import { WarehouseProduct } from 'app/modules/warehouse/models/warehouseProduct';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DateTime } from 'luxon';
import { PettyCashService } from 'app/modules/petty-cash/services/petty-cash.service';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';
import { OverviewShoppingComponent } from 'app/modules/shopping/components/overview-shopping/overview-shopping.component';
import { OverviewMovementComponent } from 'app/modules/warehouse/components/warehouse-movement/overview-movement/overview-movement.component';
import Swal from 'sweetalert2';
import { image } from 'app/modules/product/models/image-default.const';
import { Router } from '@angular/router';

const ELEMENT_DATA: any[] = [];

@Component({
    selector: 'app-store-item',
    templateUrl: './store-item.component.html',
    styleUrls: ['./store-item.component.scss']
})
export class StoreItemComponent implements OnInit , AfterViewInit {

    displayedColumns: string[] = ['id', 'pettyCashInit', 'amountEnd', 'isActive', 'acciones'];
    displayedColumnsMovement: string[] = ['id', 'movementDateRequest', 'warehouseOriginId', 'isActive', 'acciones'];
    dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
    dataSourceMovement = new MatTableDataSource<any>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator!: MatPaginator
    @ViewChild(MatSort) sort!: MatSort;



    now = DateTime.now();
    listPettyCash: any;
    page = 0;
    limit = 10;
    totalLength: number = 400;

    pagination = {
        endIndex: 9,
        lastPage: 3,
        length: 14,
        page: 0,
        size: 5,
        startIndex: 0
    }

    listOptionsPage: number[] = [5, 10, 20, 50, 100];
    pettyCash: boolean = false;


    form: FormGroup;
    formAdd: FormGroup;
    product: WarehouseProduct;
    picture: string;
    isNew: boolean;
    isValidData: boolean = true;
    activeAlert: boolean = false;
    message: string = '';
    hasEquivalences: boolean = false;
    listUnitMeasurement: any[];
    listUnitMeasurementOrigin: any[];
    currentUnitMeasurement: any;
    checkUnitMeasurement: any = null;
    labelUnitMeasurement : string = "";
    amountAvailable: number = null;
    amountAvailableFuture: number = 0;
    listWarehouseMovement: WarehouseMovement[] = null;
    listHistory: any[] = null;
    currentWarehouseProduct : any;

    @ViewChild('aForm2') aForm2: ElementRef;

    constructor(private dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) data,
        private fb: FormBuilder,
        public dialog: MatDialog,
        private service: ProductService,
        private router: Router,
        private serviceWarehouse: WarehouseService,
        private cdr: ChangeDetectorRef) {
        this.currentWarehouseProduct = data;
        if(data?.data?.product?.picture == null) {
           data.data.product.picture = image.split(',')[1];
        }
        this.product = data.data;
        this.isNew = data.isNew;
        this.hasEquivalences = this.product.product.hasEquivalences;
        this.currentUnitMeasurement = this.product.unitMeasurement;
        if (!this.isNew) {
            this.product.name = this.product.product.name;
            this.product.description = this.product.product.description;
         

        }
        this.form = this.fb.group({
            SuggestPriceShopping: [null],
            SuggestPriceSale: [null],
            count: [null],
            avaliable: [null],
            discount: [null],
            subTotal: [null],
        });
        this.formAdd = this.fb.group({
            amount: [0,[Validators.required]],
            motiveId:[1,[Validators.required]],
            price:[null,[Validators.required]],
        });

        this.resetPaginator();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            if (this.product !== null || this.product !== undefined) {
                if (this.isNew) {
                    this.setListEquivalences();
                }
                else {
                    this.setValueExisting(this.product);
                }
            }
            this.cdr.detectChanges();
          }, 0);
    }

    pageEvent(event) {
        this.limit = event.pageSize;
        this.page = event.pageIndex;;
    }

    gestionaryEquivalences(){
        this.close();
        this.router.navigate(['product/product/equivalence/'+ this.product?.product?.id]);
    }

    gestioinaryProduct(id: number){
        const dialogRef = this.dialog.open(OverviewMovementComponent, {
            data: {id: id},
            width: '80vw',
            maxWidth:'550px'
         });

         dialogRef.afterClosed().subscribe(result => {
           if(result){
            this.changeMovement();
           }
         });
    }

    overView(data: any) { }


    overViewShopping(id : any){
        
        const dialogRef = this.dialog.open(OverviewShoppingComponent, {
            maxHeight:'90vh',
            data: {id: id},
         });

         dialogRef.afterClosed().subscribe(result => {
          let tes = result;
         });
    }

    ngOnInit(): void {
       
    }

    addQuantity(currentItem: any) {
        this.labelUnitMeasurement = currentItem.unitMeasurement.name;
        this.listUnitMeasurement.map((item) => {
            item.check = (item?.unitMeasurement?.name === currentItem?.unitMeasurement?.name);
        });

        this.product.unitMeasurement;
        this.form.get('SuggestPriceShopping').setValue(currentItem?.suggestedPricePurchase);
        this.form.get('SuggestPriceSale').setValue(currentItem?.suggestedPriceSale);
        this.formAdd.get('amount').setValue(0);
        this.setAvaliable();
    }

    setAvaliable() {
        let currentUnitMeasurement = this.listUnitMeasurement.filter((item) => (item.check))[0];
        this.checkUnitMeasurement = currentUnitMeasurement.unitMeasurementId;
        let factor = this.listUnitMeasurementOrigin.filter(ele => ele.unitMeasurementMotiveId == this.checkUnitMeasurement)[0].factor;
        this.amountAvailable = parseFloat((this.product.amount / factor).toFixed(2));
        this.amountAvailableFuture = this.amountAvailable;
    }

    setValueExisting(data: any) {
        this.form.get('ProductWarehouseId').setValue(data?.ProductWarehouseId);
        this.form.get('suggestedPrice').setValue(data?.suggestedPrice);
        this.form.get('count').setValue(data?.count);
        this.form.get('avaliable').setValue(data?.avaliable);
        this.form.get('discount').setValue(data?.discount);
        this.form.get('subTotal').setValue(data?.subTotal);
    }

    setListEquivalences() {
        this.service.getAllProductEquivalence(this.product.product.id).subscribe((resp: []) =>{
            this.listUnitMeasurementOrigin = resp;
            this.service.getListWarehouseProductEquivalence(this.product.id).subscribe((resp: any) => {
                this.listUnitMeasurement = resp;
                this.listUnitMeasurement.forEach(obj => {
                    if (obj.unitMeasurementId === this.product.unitMeasurement.id) {
                        obj.check = true;
                        this.addQuantity(obj);
                    }
                });
            });
       });

    }
    
    selectTab(data: any) {

        if (data.index == 3) {
            this.changeMovement();
        }
        if (data.index == 1) {
            this.changeHistory();
        } else {

        }

    }
    changeMovement() {
        this.serviceWarehouse.getMovementByProductId(this.product.warehouseId, this.product.product.id).subscribe((response: any) => {
            this.listWarehouseMovement = response;
        })
    }

    changeHistory() {
        this.serviceWarehouse.getHistoryByProductId(this.product.id).subscribe((response: any) => {
            this.listHistory = response;
        })
    }

    close() {
        this.form.reset();
        this.dialogRef.close(true);
    }

    validateStockAvailable() {
        let count = parseFloat(this.form.get('count').value);
        let available = parseFloat(this.form.get('avaliable').value);
        if (count > available) {
            this.message = 'Stock Disponible : ' + available;
            this.isValidData = false;
        }
        else {
            this.message = '';
            this.isValidData = true;
        }
    }

    movementItem() {
        const dialogRef = this.dialog.open(FormMovementOnlyItemComponent, {
            data: {
                data: this.product,
                equivalences: this.listUnitMeasurement
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dialogRef.close(true);
            }
        });
    }

    get getUnitSelect() {
        if (this.product.product.hasEquivalences && this.product.product.hasEquivalences !== null) {
            let itemSelect = this.listUnitMeasurement.filter((item) => {
                return item.check;
            });
            return itemSelect[0].unitMeasurementDestination;
        }
        else {
            return this.product.unitMeasurement;
        }

    }

    removeItem(){
        let itemSelect = this.listUnitMeasurement.filter(({ check }) => check);
        let warehouseProductId = itemSelect[0].warehouseProductId;
        Swal.fire({
            title: "¿Seguro que quieres eliminar este producto?",
            text: "Recuerda que se eliminará solo para esta sucursal!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#A2C747",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!"
          }).then((result) => {
            if (result.isConfirmed) {
                this.serviceWarehouse.removeWarehouseProduct(warehouseProductId).subscribe((resp) =>{
                    Swal.fire({
                        title: "Eliminado!",
                        text: "El producto fue eliminado correctamente!",
                        icon: "success",
                        confirmButtonColor:"#A2C747",
                        showConfirmButton: false,
                        timer: 2000
                      });
                      this.dialogRef.close(true);
                      this.form.reset();
                 });
               }
          });

    }
    save(): void {
        this.activeAlert = false;
        if (this.isValidData) {
            let data = this.form.value;
            data.SuggestPriceShopping = parseFloat(this.form.get('SuggestPriceShopping').value);
            data.SuggestPriceSale = parseFloat(this.form.get('SuggestPriceSale').value);
            let itemSelect = this.listUnitMeasurement.filter(({ check }) => check);
            data.unitMeasurementId = itemSelect[0].unitMeasurementId;

            delete data.discount;
            delete data.avaliable;
            delete data.count;
            delete data.subTotal;
            let warehouseProductId = itemSelect[0].warehouseProductId;
            Swal.fire({
                title: "¿Seguro en actualizar los precios?",
                text: "Recuerda que los precios se actualizarán solo para esta sucursal!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#A2C747",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, actualizar!"
              }).then((result) => {
                if (result.isConfirmed) {
                    this.serviceWarehouse.UpdatePriceWarehouseProduct(warehouseProductId, data).subscribe((resp) =>{
                        Swal.fire({
                            title: "Actualizado!",
                            text: "los precios fueron actualisados correctamente!",
                            icon: "success"
                          });
                    });
                }
              });
            this.dialogRef.close(data);
            this.form.reset();
            this.activeAlert = false;
            this.message = '';
        }
        else {
            const ele = this.aForm2.nativeElement['count'];
            if (ele) {
                ele.focus();
                this.activeAlert = true;
            }
        }
    }

    resetPaginator() {
        this.page = 0;
        this.limit = 10;
      }
    
      get CurrentPaginator() {
        return `?Limit=${this.limit}&Page=${this.page}`;
      }

      keyUpAddStock(){
          let valueCurrent = this.amountAvailable;
          this.amountAvailableFuture = valueCurrent + parseFloat(this.formAdd.get('amount').value);
      }
      saveAddStock(){
        
        if(this.isValidForm){
            alert('Este metodo se esta trabajando en este presiso momento.');

        }
      }

      private isValidForm(): boolean {
        let values = this.formAdd.controls;
        Object.keys(this.formAdd.controls).forEach((field) => {
          const control = this.formAdd.get(field);
          control?.markAsTouched({ onlySelf: true });
        });
        return this.formAdd.valid;
      }
    

}
