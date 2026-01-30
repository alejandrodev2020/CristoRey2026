import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShoppingService } from 'app/modules/shopping/services/shopping.service';
import { PreviewProductShoppingComponent } from 'app/modules/shopping/components/shopping-store/preview-product-shopping/preview-product-shopping.component';
import { Image64 } from 'app/modules/shopping/models/image-default-base64.const';
import { PreviewShoppingComponent } from 'app/modules/shopping/components/shopping-store/preview-shopping/preview-shopping.component';
import { DetailProduct } from 'app/modules/sale/models/detailproduct';



@Component({
  selector: 'app-store-shopping',
  templateUrl: './store-shopping.component.html',
  styleUrls: ['./store-shopping.component.scss']
})
export class StoreShoppingComponent  implements OnInit {
  form: FormGroup;
  myControl = new FormControl('');
  options: any[] = [];
  filteredOptions: Observable<string[]>;
  totalDinner : number = 0;
  productList : any[];
  productListSelect : DetailProduct[]=[];
  filter: LocalEmit = { name: '' };
  MyPhoto: string = "";

  someValue: boolean = false;

  barcode = '';

  private lastKeyTime = 0;
  private keyTimeout = 300;
  private isProcessing = false;


  constructor(private service: ShoppingService,
              public dialog: MatDialog,
              private router: Router,
              private fb: FormBuilder,
              private cdr: ChangeDetectorRef){
              this.someValue = false;
                this.form = this.fb.group({
                  id : [null],
                  price : [null],
                  count : [null],
                  discount : [null],
                  subTotal : [null],
                  search : [''],
                });
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

  processBarcode(barcode: string) {
    let findProduct = this.productList.filter(product =>
       product.code === barcode
    );

    if(findProduct[0] != null && findProduct[0] != undefined){
       this.selectProduct(findProduct[0]);
    }
  }





  someMethod() {
    this.someValue = true;  // Cambias una propiedad vinculada a la vista
    this.cdr.detectChanges(); // Forzas la detección de cambios
  }




  ngOnInit(): void {
    this.MyPhoto = Image64;
    this.service.getAllProductShopping(1000,0).subscribe((ele: any) => {
      // Crear una copia del array para no modificar el original
      this.productList = [...ele];
  
      // Ahora agregamos las nuevas propiedades a cada item
      this.productList.forEach(item => {
        // Si la propiedad `picture` es null, asignar una imagen por defecto
        if (item.product?.picture === null) {
          item.product.picture = Image64;
        }
        item.productId = item?.id;            // Agregar productId
        item.name = item?.name;                // Agregar nombre
        item.description = item?.description;  // Agregar descripción
        item.category = item?.category?.name;
      });
    });


    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  selectProduct(product : any){
    let isNew=true;
    let validate = this.validateSelectProduct(product.id);
    if(validate.length>0 && isNew){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ya existe este producto en la lista!',
      })
    }
    else{
      const dialogRef = this.dialog.open(PreviewProductShoppingComponent, {
        data:  {
                  data :product,
                  isNew : isNew
                },
         maxWidth:'90vw',
         width:'400px',
         maxHeight: '90vh',
         disableClose:true
      });

      dialogRef.afterClosed().subscribe(result => {
        let productSelect = result;
        if(productSelect?.price && productSelect.count && productSelect?.subTotal)
        {
          this.productList.map((ele)=>{
            if(ele.id == product.id){
              ele.check = true;
            }
         });
         this.changeProductList(productSelect, isNew);
        }
      });
    }

  }

  changeProductList(product :DetailProduct,isNew : boolean){
    let validate = this.validateSelectProduct(product.id);
    if(validate.length>0 && isNew){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ya existe este producto en la lista!',
      })
    }
    else{
      if(isNew){
        this.productListSelect.push(product);
        this.reloadValueTotal();
      }
      else{
        this.productListSelect.map((ele)=>{
          if(ele.id == product.id){
              ele.count = product?.count;
              ele.discount = product?.discount;
              ele.price = product?.price;
              ele.subTotal = product?.subTotal;
              ele.hasEquivalences = product?.hasEquivalences;
              ele.expirationDate = product?.expirationDate;
              ele.unitMeasurementSelect = product?.unitMeasurementSelect;
           }
        });
        this.reloadValueTotal();
      }
    }
  }

  reloadValueTotal(){
    let total = 0;
    this.productListSelect.map((ele)=>{
        total = total + ele.subTotal;
    });
    this.totalDinner = total;
    this.form.get('search').setValue('');
  }

  updateSelect(item : DetailProduct){
    let isNew = false;
    const dialogRef = this.dialog.open(PreviewProductShoppingComponent, {
      data:  {
              data : item,
              isNew : isNew
             },
      maxWidth:'90vw',
      width:'400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      let productSelect = result;
      this.productList.map((ele)=>{
        if(ele.id == item.id){
          ele.check = true;
        }
     });
     this.changeProductList(productSelect,isNew);
    });
  }

  validateSelectProduct(id:number){
    return this.productListSelect.filter((ele)=> (ele.id == id));
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.firstName.toLowerCase().includes(filterValue));
  }


  get busqueda() {
    const searchValue = this.form.get('search')?.value?.toLocaleLowerCase() || '';  // Obtener valor de búsqueda y convertirlo a minúsculas
    return {
      name: searchValue,
      description: searchValue,
      productId: searchValue,
      category:searchValue
    };
  }

  filter2: any = { name: '' };
  getByFilterLocal(queryLocal: any) {
    this.filter2 = queryLocal;
  }


  removeItem(item : DetailProduct){
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
        this.productListSelect = this.productListSelect.filter(ele =>ele.id !== item.id);
        this.productList.map((ele)=>{
          if(ele.id == item.id){
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
  cancelStore(){
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

  previewStore(){
    let isNew = false;
    const dialogRef = this.dialog.open(PreviewShoppingComponent, {
      autoFocus: false,
      maxHeight: '90vh',
      width:'450px',
      maxWidth:'90vw',
      
      data : { detailProduct : this.productListSelect,
                total : this.totalDinner,
               form : this.form.value,
             }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }



}
interface LocalEmit {
  name: string;
}
