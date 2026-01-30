import { Component, HostListener, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Image64 } from 'app/modules/shopping/models/image-default-base64.const';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';
import { WarehouseProduct } from 'app/modules/warehouse/models/warehouseProduct';
import { ProductSelect } from 'app/modules/sale/models/productSelect';
import { PettyCashService } from 'app/modules/petty-cash/services/petty-cash.service';
import { Warehouse } from 'app/modules/warehouse/models/warehouse';
import { debounceTime, switchMap } from 'rxjs/operators';

export interface SearchCriteria  {
  name: string,  
  productId: string
};

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
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

}
