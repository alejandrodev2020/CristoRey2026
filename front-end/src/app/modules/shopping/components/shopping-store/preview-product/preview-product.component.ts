import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'app/modules/product/models/product';

@Component({
  selector: 'app-preview-product',
  templateUrl: './preview-product.component.html',
  styleUrls: ['./preview-product.component.scss']
})
export class PreviewProductComponent implements OnInit {
  form: FormGroup;
  product : Product;
  isNew : boolean;
  @ViewChild('aForm') aForm: ElementRef;

constructor(private dialogRef: MatDialogRef<any>,
            @Inject(MAT_DIALOG_DATA) data,
            private fb: FormBuilder){
  this.product= data.data;
  this.isNew = data.isNew;
  this.form = this.fb.group({
    id : [null],
    price : [null],
    count : [null],
    discount : [null],
    subTotal : [null],
  });
}
  ngOnInit(): void {
    if(this.product !== null || this.product !== undefined){
      if(this.isNew){
        this.setValuesDefault(this.product);
      }
      else{
        this.setValueExisting(this.product);
      }
    }

  }

  setValuesDefault(product : Product){
      this.form.get('id').setValue(product?.id);
      this.form.get('price').setValue(product?.salePrice);
      this.form.get('count').setValue(1);
      this.form.get('discount').setValue(0);
      this.form.get('subTotal').setValue(product?.salePrice);
  }

  setValueExisting(data : any){
    this.form.get('id').setValue(data?.id);
    this.form.get('price').setValue(data?.price);
    this.form.get('count').setValue(data?.count);
    this.form.get('discount').setValue(data?.discount);
    this.form.get('subTotal').setValue(data?.subTotal);
  }


  close(){
    this.dialogRef.close(true);
  }


  calculateSubTotal(){
   let price = parseFloat(this.form.get('price').value);
   let count = parseFloat(this.form.get('count').value);
   let discount = parseFloat(this.form.get('discount').value);

   price =  isNaN(price)?0:price;
   count =  isNaN(count)?0:count;
   discount =  isNaN(discount)?0:discount;

   let subTotal = (price * count) - discount;

   this.form.get('subTotal').setValue(subTotal);
  }

  addInput(value:any){
    if(value !== 'save'){
      const ele = this.aForm.nativeElement[value];
      if (ele) {
        ele.focus();
      }
    }
    else{
      this.save();
    }
  }

  save(): void {
    let data = this.form.value;
    data.name = this.product?.name;
    data.description = this.product?.description;
    this.dialogRef.close(data);
    this.form.reset();
  }

}
