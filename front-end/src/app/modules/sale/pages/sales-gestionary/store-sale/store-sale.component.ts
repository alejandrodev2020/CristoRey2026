import { Component, HostListener, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PreviewSaleComponent } from 'app/modules/sale/components/sale-store/preview-sale/preview-sale.component';
import { Image64 } from 'app/modules/shopping/models/image-default-base64.const';
import { SelectWarehouseComponent } from 'app/modules/sale/components/sale-store/select-warehouse/select-warehouse.component';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';
import { PreviewProductComponent } from 'app/modules/sale/components/sale-store/preview-product/preview-product.component';
import { WarehouseProduct } from 'app/modules/warehouse/models/warehouseProduct';
import { ProductSelect } from 'app/modules/sale/models/productSelect';
import { PettyCashService } from 'app/modules/petty-cash/services/petty-cash.service';
import { Warehouse } from 'app/modules/warehouse/models/warehouse';


export interface SearchCriteria  {
  name: string,  
  productId: string
};
@Component({
  selector: 'app-store-sale',
  templateUrl: './store-sale.component.html',
  styleUrls: ['./store-sale.component.scss']
})
export class StoreSaleComponent implements OnInit {
  form: FormGroup;
  myControl = new FormControl('');
  options: any[] = [];
  filteredOptions: Observable<string[]>;
  totalDinner: number = 0;
  warehouseSelectStatus?: boolean = false;
  pettyCash: any = null;
  viewMessage: boolean = false;
  productList: WarehouseProduct[] = [];
  productListSelect: ProductSelect[] = [];
  listWarehouse: Warehouse[] =[];
  textSearch : string = '';
  currentWarehouseId : number = 0;
  userConfiguration : any;
  page = 0;
  limit = 1000;
  barcode = '';

  myCriteria : SearchCriteria = {
    name:'',
    productId:''
  }
  private lastKeyTime = 0;
  private keyTimeout = 300;
  private isProcessing = false;

  constructor(
    private serviceWarehouse: WarehouseService,
    private servicePettyCash: PettyCashService,
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: [null],
      price: [null],
      count: [null],
      discount: [null],
      subTotal: [null],
      purcharsePrice: [null],
      warehouseId: [null],
      search: [''],
    });

    let storedUserLogged = localStorage.getItem('userLogged');
    if (storedUserLogged) {
      let userLogged = JSON.parse(storedUserLogged);
      this.userConfiguration = userLogged?.authUserConfiguration;
      this.limit = (this.userConfiguration.allItemsSale) ? 1000 : this.userConfiguration.countItemsSale;
    } else {
      console.log('No se encontró el dato en el localStorage.');
    }
  }


  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
        if (!/[0-9]/.test(event.key)) {
            return;
        }
        const now = Date.now();
        if (now - this.lastKeyTime > this.keyTimeout) {
            this.barcode = '';
        }
        this.barcode += event.key;
        this.lastKeyTime = now;

        if (!this.isProcessing) {
            this.isProcessing = true;
            setTimeout(() => {
            this.processBarcode(this.barcode);
            this.barcode = '';
            this.isProcessing = false;
            }, this.keyTimeout);
        }
  }

  searchCriteria(){
    let valueSearch = this.form.get('search').value;
    this.myCriteria = {
      name : valueSearch,
      productId : valueSearch
    }
  }

  processBarcode(barcode: string) {
    let findProduct = this.productList.filter(product =>
       product.product.code === barcode
    );
    if(findProduct[0] != null && findProduct[0] != undefined){
       this.selectProduct(findProduct[0]);
    }
  }

  ngOnInit(): void {
    let warehouseDefault = localStorage.getItem('warehouseDefault');
    if (warehouseDefault !== null) {
        let defaultWarehouse = JSON.parse(warehouseDefault);
        this.warehouseSelectStatus = true;
        this.viewMessage = false;
        this.setWarehouse(defaultWarehouse);
    }
    else{
        this.getAllListWarehouse();
        this.warehouseSelectStatus = false;
        this.viewMessage = true;
    }

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  getAllListWarehouse(){
        this.serviceWarehouse.getAllWarehouse().subscribe((resp: Warehouse[])=>{
            const activeWarehouses = resp.filter(warehouse => warehouse.isActive === true);
            this.listWarehouse = activeWarehouses;

            if (activeWarehouses.length === 1) {
                this.setWarehouseLocalStorage(activeWarehouses[0]);
            }
        })
  }

  setWarehouseLocalStorage(item : Warehouse){
    localStorage.setItem('warehouseDefault',JSON.stringify(item));
    this.setWarehouse(item);
  }

  setWarehouse(data : any){
    const warehouseId = (typeof data === 'object' && data?.id) ? data.id : data;
    if (warehouseId > 0 ) {
           this.form.get('warehouseId').setValue(warehouseId);
           this.setPettyCashByWarehouseId(warehouseId);
           this.currentWarehouseId = warehouseId;
       }
  }

  searchProduct(){
    let searchLabel = this.form.get('search').value;
    this.textSearch = searchLabel;
    if(!this.userConfiguration.allItemsSale){
      this.limit = (this.textSearch !== '') ? 100 : (this.userConfiguration.countItemsSale || 100);    
      this.setProductByWarehouseId(this.currentWarehouseId);
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.searchProduct();
  }

  cleanSearch(){
    this.form.get('search').setValue('');
    this.myCriteria = {
      name : '',
      productId : ''
    }
    this.searchProduct();
  }

  setProductByWarehouseId(id: number) {
    let queryString =  this.CurrentPaginator;

    if(this.textSearch !== ''){
      queryString = `?Name=${this.textSearch}&${this.CurrentPaginator}`;
      queryString = queryString.replace('&?', '&');
    }

    this.serviceWarehouse.getProductByWarehouseId(id, queryString).subscribe((resp: any) => {
      this.productList = resp.listProducts;
      this.myCriteria = {
        name : '',
        productId : ''
      }
      this.productList.forEach(item => {
        if (item.product?.picture === null) {
          item.product.picture = Image64;
        }
        item.productId = item.product.id;
        item.name = item.product.name;
        item.description = item.product.description;
      });
    });
  }

  get CurrentPaginator() {
    return `?Limit=${this.limit}&Page=${this.page}`;
  }

  setPettyCashByWarehouseId(id: number) {
    this.servicePettyCash.getByWarehouseId(id).subscribe((resp: any) => {
      if (resp == null || resp?.pettyCashEnd !== null) {
        Swal.fire({
          icon: 'error',
          title: 'Sin Caja...',
          text: 'Este almacen no tiene una caja aperturada!',
        });
        this.router.navigate(['sale']);
      } else {
        this.setProductByWarehouseId(id);
        this.warehouseSelectStatus = true;
        this.pettyCash = resp;
      }
    });
  }



  selectProduct(productWarehouse: any) {
    let isNew = true;
    let validate = this.validateSelectProduct(productWarehouse.id);
    if (validate.length > 0 && isNew) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ya existe este producto en la lista!',
      });
    } else {
      productWarehouse.amountOrigin = productWarehouse.amount;
      const dialogRef = this.dialog.open(PreviewProductComponent, {
        data: {
          data: productWarehouse,
          isNew: isNew
        },
        width:'400px',
        maxWidth:'80vw',
        maxHeight: '90vh'
      });

      dialogRef.afterClosed().subscribe(result => {
        let productSelect = result;
        if (productSelect?.price && productSelect.count && productSelect?.subTotal) {
          this.productList.forEach(ele => {
            if (ele.id == productWarehouse.id) {
              ele.check = true;
            }
          });
          this.changeProductList(productSelect, isNew);
        }
      });
    }
  }

  changeProductList(product: ProductSelect, isNew: boolean) {
    let validate = this.validateSelectProduct(product.id);
    if (validate.length > 0 && isNew) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ya existe este producto en la lista!',
      });
    } else {
      if (isNew) {
        this.productListSelect.push(product);
        this.reloadValueTotal();
      } else {
        this.productListSelect.forEach(ele => {
          if (ele.id == product.id) {
            ele.count = product.count;
            ele.discount = product.discount;
            ele.suggestedPrice = product.suggestedPrice;
            ele.price = product.price;
            ele.subTotal = product.subTotal;
            ele.unitMeasurementSelect = product.unitMeasurementSelect;
          }
        });
        this.reloadValueTotal();
      }
    }
  }

  reloadValueTotal() {
    let total = 0;
    this.productListSelect.forEach(ele => {
      total += ele.subTotal;
    });
    this.totalDinner = total;
    this.cleanSearch();
  }

  getStockProduct(id: number) {
    let cas = this.productList.filter(ele => ele.id === id)
    return cas[0].amount;
  }

  updateSelect(product: ProductSelect) {
    let isNew = false;
    const dialogRef = this.dialog.open(PreviewProductComponent, {
      data: {
        data: product,
        isNew: isNew
      },
      maxWidth:'400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      let productSelect = result;
      this.productList.forEach(ele => {
        if (ele.id == product.id) {
          ele.check = true;
        }
      });
      this.changeProductList(productSelect, isNew);
    });
  }

  validateSelectProduct(id: number) {
    return this.productListSelect.filter(ele => (ele.id == id));
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.firstName.toLowerCase().includes(filterValue));
  }

  get busqueda() {
    const searchValue = this.form.get('search')?.value?.toLocaleLowerCase() || '';  // Obtener valor de búsqueda y convertirlo a minúsculas
    return {
      name: searchValue,
      productId: searchValue
    };
  }

  filter2: any = { name: '' };
  getByFilterLocal(queryLocal: any) {
    this.filter2 = queryLocal;
  }

  removeItem(item: ProductSelect) {
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
        this.productList.forEach(ele => {
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

  returnStore() {
    this.router.navigate(['sale']);
  }

  onFabClick() {
    let isNew = false;
    const dialogRef = this.dialog.open(PreviewSaleComponent, {
      autoFocus: false,
      maxHeight: '90vh',
      width: '500px',
      maxWidth:'95vw',
      disableClose: true,
      data: {
        detailProduct: this.productListSelect,
        pettyCash: this.pettyCash,
        total: this.totalDinner,
        form: this.form.value,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
       this.productListSelect = result;
    });
  }

  previewStore() {
    let isNew = false;
    const dialogRef = this.dialog.open(PreviewSaleComponent, {
      autoFocus: false,
      maxHeight: '90vh',
      maxWidth: '500px',
      disableClose: true,
      data: {
        detailProduct: this.productListSelect,
        pettyCash: this.pettyCash,
        total: this.totalDinner,
        form: this.form.value,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.productListSelect = result;
      this.reloadValueTotal();
    });
  }
}
