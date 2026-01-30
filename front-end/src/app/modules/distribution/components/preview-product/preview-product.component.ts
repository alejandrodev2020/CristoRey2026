import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'app/modules/product/services/product.service';
import { WarehouseProduct } from 'app/modules/warehouse/models/warehouseProduct';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';
import Big from 'big.js';


@Component({
  selector: 'app-preview-product',
  templateUrl: './preview-product.component.html',
  styleUrls: ['./preview-product.component.scss']
})
export class PreviewProductComponent implements OnInit , AfterViewInit{
  form: FormGroup;
  product : WarehouseProduct;
  picture : string;
  isNew : boolean;
  isValidData : boolean = true;
  activeAlert : boolean = false;
  message : string = '';
  listUnitMeasurement : any[];
  listUnitMeasurementOrigin : any[];
  currentUnitMeasurement:any;
  checkUnitMeasurement:any;
  amountAvailable : number = null;
  amountOrigin : number = null;
  labelUnitMeasurement: string = "";
  @ViewChild('aForm2') aForm2: ElementRef;
  viewPricePurcharse : boolean = false;
  listHistory: any[] = null;
  purcharsePrice : number = 0;
  purcharsePriceCalculate : number = 0;
  purcharsePriceReal : number = 0;
  ShoppingUnitMeasurementId : number = 0;

constructor(private dialogRef: MatDialogRef<any>,
            @Inject(MAT_DIALOG_DATA) data,
            private fb: FormBuilder,
            private service : ProductService,
            private serviceWarehouse: WarehouseService,
            private cdr: ChangeDetectorRef){
  this.product= data.data;
  this.amountOrigin = data?.data?.amountOrigin;
  this.isNew = data.isNew;
   if(!this.isNew){
    this.product.name = this.product.product.name;
    this.product.description = this.product.product.description;
   }

  this.form = this.fb.group({
    id : [null],
    suggestedPrice : [null], // si
    amount : [null],  // si
    avaliable : [null],
    discount : [null],  // si
    subTotal : [null],
    amountOrigin : [null],
  });
}
  ngAfterViewInit(): void {

    setTimeout(() => {
        if(this.product !== null || this.product !== undefined){
            this.setListUnitmeasurenmetOrigin(this.product);
        }
        this.cdr.detectChanges();
      }, 0);
  }

  setListUnitmeasurenmetOrigin(data : any){
    this.service.getAllProductEquivalence(data?.product?.id).subscribe((resp: [])=>{
         this.listUnitMeasurementOrigin = resp;
         this.setValuesDefault(this.product);
    })

  }

  calculatePriceShopping(){
      let factor = this.filterByMotiveId(this.ShoppingUnitMeasurementId);
      let value =  this.purcharsePrice / factor[0].factor;
      this.purcharsePriceCalculate = value;
      this.purcharsePriceReal = value;
  }

  filterByMotiveId(id: number): any[] {
    return this.listUnitMeasurementOrigin.filter(
      (item: any) => item.unitMeasurementMotiveId === id
    );
  }


  ngOnInit(): void {

  }

  setValuesDefault(product : WarehouseProduct){
      let amount = (product.amountOrigin < 1)? product.amountOrigin : 1;
      this.form.get('id').setValue(product?.id);
      this.form.get('suggestedPrice').setValue(product?.suggestedPrice);
      this.form.get('avaliable').setValue(product?.amount);
      this.form.get('amount').setValue( (this.isNew)?amount:product?.amount);
      this.form.get('discount').setValue((this.isNew)?0:product?.discount);
      this.form.get('subTotal').setValue(product?.suggestedPrice);
      this.form.get('amountOrigin').setValue(product?.amountOrigin);
      this.checkUnitMeasurement = (this.isNew)? product.unitMeasurement : product.unitMeasurementSelect?.unitMeasurement;
      this.setListEquivalences();
      this.getPriceShopping();
      this.calculateSubTotal();
  }

  showPricePurcharse(){
    this.viewPricePurcharse = true;
  }
  hiddenPricePurcharse(){
    this.viewPricePurcharse = false;
  }
  getPriceShopping(){
    this.serviceWarehouse.getHistoryByProductId(this.product.id).subscribe((response: any) => {
       this.listHistory = response;
       const batches = response;
       const availableBatches = batches.filter((batch: any) => batch.amountAvailable > 0);
       if (availableBatches.length > 0) {
         const sortedBatches = availableBatches.sort((a: any, b: any) => a.id - b.id);
           const oldestBatch = sortedBatches[0];
           if(oldestBatch){
              this.purcharsePrice = oldestBatch?.purchasePrice;
              this.ShoppingUnitMeasurementId = oldestBatch?.unitMeasurementId;
              this.calculatePriceShopping();
           }
       }
       else {
         console.log('No hay lotes disponibles.');
         return null;
       }


     });
  }


  async addQuantity(currentItem : any){
    this.listUnitMeasurement.map((item)=>{
      if(item.unitMeasurement.name === currentItem.unitMeasurement.name){
        item.check = true;
        this.checkUnitMeasurement = item;
        this.labelUnitMeasurement = item?.unitMeasurement?.name;
        let factor = this.filterByMotiveId(item?.unitMeasurement?.id);
        let value =  this.purcharsePriceReal * factor[0].factor;
        this.purcharsePriceCalculate = value;
      }else{
        item.check = false;
      }
    });

    await this.setAvaliable();
    this.form.get('suggestedPrice').setValue(currentItem.suggestedPriceSale);
    if(this.amountAvailable > 1){
        this.form.get('amount').setValue(1);
    }
    else{
        this.form.get('amount').setValue(this.amountAvailable);
    }

    await this.calculateSubTotal();

  }

  setAvaliable(){
     let currentUnitMeasurement = this.listUnitMeasurement.filter((item)=>(item.check))[0];
     let currentOrigen = this.listUnitMeasurementOrigin.filter(ele => ele.unitMeasurementMotiveId == currentUnitMeasurement.unitMeasurementId)[0];
     this.amountAvailable =  parseFloat((this.amountOrigin  / currentOrigen.factor).toFixed(2));
     this.form.get('avaliable').setValue(this.amountAvailable);
  }



  setListEquivalences(){
      this.service.getListWarehouseProductEquivalence(this.product?.id).subscribe((resp:any)=>{
        this.listUnitMeasurement = resp;
        this.listUnitMeasurement.forEach( obj =>{
          if(obj.unitMeasurementId === this.checkUnitMeasurement.id){
              obj.check = true;
              this.checkUnitMeasurement = obj;
              this.labelUnitMeasurement = obj?.unitMeasurement?.name}
          });
        this.setAvaliable();
      });
  }


  close(){
    this.form.reset();
    this.dialogRef.close(true);
  }

  validateStockAvailable(){
    let count =     parseFloat(this.form.get('amount').value);
    let available = parseFloat(this.form.get('avaliable').value);
    let name = this.labelUnitMeasurement;
    if(count > available){
        this.message = 'Stock Disponible : ' + available +' ' +name;
        this.isValidData=false;
    }
    else{
      this.message = '';
      this.isValidData=true;
    }
  }

  calculateSubTotal(){
  //  this.validateStockAvailable();
  this.isValidData=true;
   let suggestedPrice = parseFloat(this.form.get('suggestedPrice').value);
   let count = parseFloat(this.form.get('amount').value);
   let discount = parseFloat(this.form.get('discount').value);
   suggestedPrice =  isNaN(suggestedPrice)?0:suggestedPrice;
   count =  isNaN(count)?0:count;
   discount =  isNaN(discount)?0:discount;
   let subTotal = (suggestedPrice * count) - discount;
   this.form.get('subTotal').setValue(subTotal);
  }

  addInput(value:any){
    if(value !== 'save'){
      const ele = this.aForm2.nativeElement[value];
      if (ele) {
        ele.focus();
      }
    }
    else{
      this.save();
    }
  }
  control(key: string): FormControl {
    return this.form.controls[key] as FormControl;
  }



  incrementItemNumber() {
    let newValue = new Big(this.form.get('amount').value);
    this.form.get('amount').setValue(newValue.plus(1).toNumber());
    this.calculateSubTotal();
  }

  decrementItemNumber() {
    let newValue = new Big(this.form.get('amount').value);
    if( parseFloat(newValue)<= 0 || parseFloat(newValue)<= 0.9) return;
    this.form.get('amount').setValue(newValue.minus(1).toNumber());
    this.calculateSubTotal();
  }

  incrementItemDecimal() {
    let newValue = new Big(this.form.get('amount').value);
    this.form.get('amount').setValue(newValue.plus(0.1).toNumber());
    this.calculateSubTotal();
  }

  decrementItemDecimal() {
    let newValue = new Big(this.form.get('amount').value);
    if( parseFloat(newValue)<= 0) return;
    this.form.get('amount').setValue(newValue.minus(0.1).toNumber());
    this.calculateSubTotal();
  }


  incrementPriceNumber() {
    let newValue = new Big(this.form.get('suggestedPrice').value);
    this.form.get('suggestedPrice').setValue(newValue.plus(1).toNumber());
    this.calculateSubTotal();
  }

  decrementPriceNumber() {
    let newValue = new Big(this.form.get('suggestedPrice').value);
    if( parseFloat(newValue)<= 0 || parseFloat(newValue)<= 0.9) return;
    this.form.get('suggestedPrice').setValue(newValue.minus(1).toNumber());
    this.calculateSubTotal();
  }

  incrementPriceDecimal() {
    let newValue = new Big(this.form.get('suggestedPrice').value);
    this.form.get('suggestedPrice').setValue(newValue.plus(0.1).toNumber());
    this.calculateSubTotal();
  }

  decrementPriceDecimal() {
    let newValue = new Big(this.form.get('suggestedPrice').value);
    if( parseFloat(newValue)<= 0) return;
    this.form.get('suggestedPrice').setValue(newValue.minus(0.1).toNumber());
    this.calculateSubTotal();
  }


  save(): void {

    this.activeAlert = false;
    if(this.isValidData){
      let data = this.form.value;
      data.count = parseFloat(this.form.get('amount').value);
      data.discount = parseFloat(this.form.get('discount').value);
      data.price = parseFloat(this.form.get('suggestedPrice').value);
      data.product = this.product.product;
      data.unitMeasurement = this.product.unitMeasurement;
      data.unitMeasurementSelect = this.checkUnitMeasurement;
      data.listUnitMeasurementEquivalences = this.listUnitMeasurement;
      this.dialogRef.close(data);
      this.form.reset();
      this.activeAlert = false;
      this.message='';
    }
    else{
      const ele = this.aForm2.nativeElement['amount'];
      if (ele) {
        ele.focus();
        this.activeAlert = true;
      }
    }
  }

}
