import { Component, HostListener, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Image64 } from 'app/modules/shopping/models/image-default-base64.const';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';
import { WarehouseProduct } from 'app/modules/warehouse/models/warehouseProduct';
import { ProductSelect } from 'app/modules/sale/models/productSelect';
import { Warehouse } from 'app/modules/warehouse/models/warehouse';
import { debounceTime, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PreviewProductComponent } from '../../components/preview-product/preview-product.component';
import { PreviewOrderComponent } from '../../components/preview-order/preview-order.component';


export interface SearchCriteria  {
  name: string,  
  productId: string
};

@Component({
  selector: 'app-distribution-raise-order',
  templateUrl: './distribution-raise-order.component.html',
  styleUrls: ['./distribution-raise-order.component.scss']
})

export class DistributionRaiseOrderComponent implements OnInit {
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
  barcode = '';
  id:number = 0;

  myCriteria : SearchCriteria = {
    name:'',
    productId:''
  }
  products: any[] = [];
  isLoading: boolean = false;
  page: number = 0;
  limit: number = 25;
  private searchSubject: Subject<string> = new Subject<string>();
  constructor(
    private serviceWarehouse: WarehouseService,
    private activatedRoute: ActivatedRoute,
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
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    let storedUserLogged = localStorage.getItem('userLogged');
    if (storedUserLogged) {
      let userLogged = JSON.parse(storedUserLogged);
      this.userConfiguration = userLogged?.authUserConfiguration;
    } else {
      console.log('No se encontró el dato en el localStorage.');
    }

    this.form.get('search')?.valueChanges.pipe(
      debounceTime(1500),  
      switchMap(query => {
        if (!query.trim()) {
          
          this.products = [];
          return new Observable<any[]>();
        } else {
          return this.searchBackend(query);  
        }
      })
    ).subscribe((results: any[]) => {
      this.handleSearchResults(results);  
    });
  }

  private handleSearchResults(results: any[]) {
    console.log(results);
    this.products = results; 
    this.myCriteria = {
      name: this.form.get('search')?.value,
      productId: this.form.get('search')?.value
    };
  }

  private searchBackend(query: string) {
    if (!query.trim()) {
      this.products = [];  
      return new Observable<any[]>(); 
    }
    this.searchProduct(query); 
    return new Observable<any[]>();
  }

  searchCriteria(){
    let valueSearch = this.form.get('search').value;
    this.myCriteria = {
      name : valueSearch,
      productId : valueSearch
    }
  }

  ngOnInit(): void {
    this.warehouseSelectStatus = true;
    this.setProductByWarehouseId(2);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  searchProduct(query: string) {
    let searchLabel = query.trim();
    this.textSearch = searchLabel;
    if (this.textSearch !== '') {
      this.setProductByWarehouseId(2);
    }
  }

  cleanSearch(){
    this.form.get('search').setValue('');
    this.myCriteria = {
      name : '',
      productId : ''
    }
  }

  onSearchChange(query: string): void {
    this.searchCriteria();
    let valueSearch = this.form.get('search')?.value;
    this.searchSubject.next(valueSearch); 
    this.textSearch = valueSearch;
  }

  setProductByWarehouseId(id: number): void {
    if (this.isLoading) return; 
    this.isLoading = true;
    let queryString = this.CurrentPaginator;

    if (this.textSearch !== '') {
      this.page=0;
      queryString = `?Name=${this.textSearch}&${this.CurrentPaginator}`;
      queryString = queryString.replace('&?', '&');
    }

    this.serviceWarehouse.getProductByWarehouseId(id, queryString).subscribe((resp: any) => {
      let a = this.productList;
      this.addUniqueProducts(resp.listProducts)
      let b = this.productList;

      this.productList.forEach(item => {
        if (item.product?.picture === null) {
          item.product.picture = Image64; 
        }
        item.productId = item.product.id;
        item.name = item.product.name;
        item.description = item.product.description;
      });

      this.isLoading = false;
      const valueSearch = this.form.get('search')?.value || ''; 
      if(valueSearch !== ''){
        this.myCriteria = {
          name: '',
          productId: ''
        };
        if(a === b){
          this.productList.reverse();
        }
      }
    });
  }

  onFabClick() {
    let isNew = false;
    const dialogRef = this.dialog.open(PreviewOrderComponent, {
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

  addUniqueProducts(newProducts: WarehouseProduct[]): void {
    if(this.productList.length === 0){
        this.products = newProducts;
        this.productList = [...newProducts]
    }
    else{
      newProducts.forEach(currentNewProduct => {
        const productExistsInProducts = this.products.some(existingProduct => existingProduct.product.id == currentNewProduct.product.id);
        const productExistsInProductList = this.productList.some(existingProduct => existingProduct.product.id == currentNewProduct.product.id);
        if (!productExistsInProducts && !productExistsInProductList) {
          this.products.push(currentNewProduct);
          this.productList.push(currentNewProduct);
        }
      });
    }
  }

  get CurrentPaginator() {
    return `?Limit=${this.limit}&Page=${this.page}`;
  }

  onScroll(event: any): void {
    const threshold = this.productList.length - 5; 
    if(this.form.get('search').value == ''){

      if (event > threshold && !this.isLoading) {
        this.page++;
        this.setProductByWarehouseId(2);
      }
    }
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.firstName.toLowerCase().includes(filterValue));
  }

  previewStore() {
    let isNew = false;
    const dialogRef = this.dialog.open(PreviewOrderComponent, {
      autoFocus: false,
      maxHeight: '90vh',
      maxWidth: '500px',
      disableClose: true,
      data: {
        distributionId : this.id,
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
  validateSelectProduct(id: number) {
    return this.productListSelect.filter(ele => (ele.id == id));
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













}
