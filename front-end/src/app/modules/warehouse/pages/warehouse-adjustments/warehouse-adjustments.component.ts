import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from 'app/modules/client/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingService } from 'app/modules/shopping/services/shopping.service';
import { PreviewProductShoppingComponent } from 'app/modules/shopping/components/shopping-store/preview-product-shopping/preview-product-shopping.component';
import { Image64 } from 'app/modules/shopping/models/image-default-base64.const';
import { PreviewShoppingComponent } from 'app/modules/shopping/components/shopping-store/preview-shopping/preview-shopping.component';
import { WarehouseService } from '../../services/warehouse.service';
import { DetailProduct } from 'app/modules/shopping/models/detailproduct';

import { DomSanitizer } from '@angular/platform-browser';
import { image } from 'app/modules/product/models/image-default.const';
import { StoreItemComponent } from '../item-gestionary/store-item/store-item.component';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';



@Component({
  selector: 'app-warehouse-adjustments',
  templateUrl: './warehouse-adjustments.component.html',
  styleUrls: ['./warehouse-adjustments.component.css']
})
export class WarehouseAdjustmentsComponent implements OnInit {
    loading: boolean = true; 
    form: FormGroup;
    myControl = new FormControl('');
    imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(image);
    options: any[] = [];
    filteredOptions: Observable<string[]>;
    totalDinner: number = 0;
    productList: any[] = [];
    queryString:string;
    productListSelect: DetailProduct[] = [];
    filter: LocalEmit = { name: '' };
    warehouseId: number;
    queryFilter = '';

    limit = 18;
    listOptionsPage: number[] = [5, 10, 20, 50, 100, 500, 1000];
    objComplete = null;
    totalLength: number = 400;
    isFilterVisible: boolean = false;


    page: number = 0;

    @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
    constructor(
        private service: WarehouseService,
        private serviceShopping : ShoppingService,
        private activatedRoute: ActivatedRoute,
        public dialog: MatDialog,
        private sanitizer: DomSanitizer,
        private router: Router,
        private fb: FormBuilder) {

        this.form = this.fb.group({
            id: [null],
            price: [null],
            count: [null],
            discount: [null],
            subTotal: [null],
            search: [''],
        });
    }

    ngOnInit(): void {
        this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(image);
        this.warehouseId = parseInt(this.activatedRoute.snapshot.params['id']);

        this.serviceShopping.getAllProductShopping(10,this.page).subscribe((ele: any) => {
            this.productList = ele;
            this.objComplete = ele;
            this.totalLength = 10;
            this.productList.map((item) => {
                if (item?.picture === null) {
                    item.product.picture = Image64;
                }
            });
        });
        this.loading = false;
    }

    get CurrentPaginator() {
        return `?Limit=${this.limit}&Page=${this.page}`;
    }

    pageEvent(event) {
        this.limit = event.pageSize;
        this.page = event.pageIndex;
        this.service.getProductByWarehouseId(this.warehouseId, this.CurrentPaginator + this.queryFilter).subscribe((ele: any[any]) => {
            this.productList = ele.listProducts;
            this.objComplete = ele;
            this.totalLength = ele.total;
        });
    }


    toggleFilter() {
        this.isFilterVisible = !this.isFilterVisible;
    }

    addProductForWareouse(){
        this.router.navigate([`warehouse/warehouse/${this.warehouseId}/warehouse-adjustments`]);
    }

    senfilter(event: string) {
        this.limit = 18;
        this.page = 0;
         this.queryString = this.CurrentPaginator + event;
        this.service.getProductByWarehouseId(this.warehouseId, this.queryString).subscribe((ele: any[any]) => {
            this.productList = ele.listProducts;
            this.objComplete = ele;
            this.totalLength = ele.total;
            this.queryFilter = event;
        });
    }

    selectProduct(product: any) {
        let isNew = true;
        let validate = this.validateSelectProduct(product.id);
        if (validate.length > 0 && isNew) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ya existe este producto en la lista!',
            })
        }
        else {
            const dialogRef = this.dialog.open(StoreItemComponent, {
                data: {
                    data: product,
                    isNew: isNew
                },
                maxHeight:'90vh',
                disableClose: true
            });

            dialogRef.afterClosed().subscribe(result => {
                let productSelect = result;
                if (productSelect?.price && productSelect.count && productSelect?.subTotal) {
                    this.productList.map((ele) => {
                        if (ele.id == product.id) {
                            ele.check = true;
                        }
                    });
                    this.changeProductList(productSelect, isNew);
                }
            });
        }
    }

    changeProductList(product: DetailProduct, isNew: boolean) {
        let validate = this.validateSelectProduct(product.id);
        if (validate.length > 0 && isNew) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ya existe este producto en la lista!',
            })
        }
        else {
            if (isNew) {
                this.productListSelect.push(product);
                this.reloadValueTotal();
            }
            else {
                this.productListSelect.map((ele) => {
                    if (ele.id == product.id) {
                        ele.count = product.count;
                        ele.discount = product.discount;
                        ele.price = product.price;
                        ele.subTotal = product.subTotal;
                    }
                });
                this.reloadValueTotal();
            }
        }
    }

    reloadValueTotal() {
        let total = 0;
        this.productListSelect.map((ele) => {
            total = total + ele.subTotal;
        });
        this.totalDinner = total;
        this.form.get('search').setValue('');
    }

    updateSelect(item: DetailProduct) {
        let isNew = false;
        const dialogRef = this.dialog.open(PreviewProductShoppingComponent, {
            data: {
                data: item,
                isNew: isNew
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            let productSelect = result;
            this.productList.map((ele) => {
                if (ele.id == item.id) {
                    ele.check = true;
                }
            });
            this.changeProductList(productSelect, isNew);
        });
    }

    validateSelectProduct(id: number) {
        return this.productListSelect.filter((ele) => (ele.id == id));
    }

    private _filter(value: any): any[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.firstName.toLowerCase().includes(filterValue));
    }


    get busqueda() {
        return {
            name: this.form.get('search').value,
            description: this.form.get('search').value

        }
    }

    filter2: any = { name: '' };
    getByFilterLocal(queryLocal: any) {
        this.filter2 = queryLocal;
    }

    removeItem(item: DetailProduct) {
        Swal.fire({
            title: 'Seguro que quiere quitar?',
            text: "Una ves quitado, no se revertira!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.productListSelect = this.productListSelect.filter(ele => ele.id !== item.id);
                this.productList.map((ele) => {
                    if (ele.id == item.id) {
                        ele.check = false;
                    }
                });
                this.reloadValueTotal();
                Swal.fire(
                    'Eliminado!',
                    'Ese producto no pertenece a la lista de tu compra',
                    'success'
                )
            }
        });
    }
    cancelStore() {
        Swal.fire({
            title: 'Seguro que quiere cancelar?',
            text: "Una cancelado ya se perderá lo seleccionado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Cancelar!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.reloadValueTotal();
                Swal.fire(
                    'Cancelado!',
                    'La nota de venta ah sido cancelada!',
                    'success'
                );
                this.router.navigate(['sale']);
            }
        });
    }
    
    gestionaryTransfer() {
        if(this.queryString != null){
            this.warehouseId = parseInt(this.activatedRoute.snapshot.params['id']);
            this.service.generateReportingExcelProductById(this.warehouseId, this.queryString).subscribe(
                (response: Blob) => {
                    const fileURL = URL.createObjectURL(response);
                    window.open(fileURL, '_blank');
                    setTimeout(() => {
                        URL.revokeObjectURL(fileURL);
                    }, 100);
                },
                err => {
                    console.error('Error al descargar el Excel:', err);
                }
            );
        }else{
            this.warehouseId = parseInt(this.activatedRoute.snapshot.params['id']);
            this.service.generateReportingExcelProductById(this.warehouseId, this.CurrentPaginator).subscribe(
                (response: Blob) => {
                    const fileURL = URL.createObjectURL(response);
                    window.open(fileURL, '_blank');
                    setTimeout(() => {
                        URL.revokeObjectURL(fileURL);
                    }, 100);
                },
                err => {
                    console.error('Error al descargar el Excel:', err);
                }
            );
        }
    }

    gestionaryMovement() {
        this.router.navigate([`warehouse/warehouse/${this.warehouseId}/movement`]);
    }

    previewStore() {
        let isNew = false;
        const dialogRef = this.dialog.open(PreviewShoppingComponent, {
            autoFocus: false,
            maxHeight: '90vh',
            data: {
                detailProduct: this.productListSelect,
                total: this.totalDinner,
                form: this.form.value,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    loadProducts(): void {
        if (this.loading) return; // No hacer más peticiones mientras se está cargando
        this.loading = true;
        this.page++;
        this.serviceShopping.getAllProductShopping(30,this.page).subscribe((data: any) => {
          if (data && data.length) {
            this.productList = [...this.productList, ...data]; // Agregar los nuevos productos a la lista
            // Incrementar la página para la siguiente carga
          }
          this.loading = false;
        });
      }

    onScroll(event: CdkVirtualScrollViewport): void {
        const endOfList = this.viewport.getRenderedRange().end === this.productList.length;
        if (endOfList && !this.loading) {
          this.loadProducts();
        }
    }
}

interface LocalEmit {
    name: string;
}
