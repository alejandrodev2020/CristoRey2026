import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sale-credit-store',
  templateUrl: './sale-credit-store.component.html',
  styleUrls: ['./sale-credit-store.component.scss']
})
export class SaleCreditStoreComponent {
  
  form: FormGroup;
  id:number;
  paymentDelivered : number;
  debt : number = 0;
  messaje : string;


  constructor(private dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) data,
              private router: Router,
              private fb: FormBuilder) 
       {
        this.form = this.fb.group({
        paymentDelivered : [null,[Validators.required]],
        amountCredit : [null],
        });
        this.paymentDelivered = data;

        }


  close(){
    this.form.reset();
    this.dialogRef.close(false);
  }
  cancelSaleCredit(){
    this.form.reset();
    this.dialogRef.close(false);
  }


  onKey(event: any){
     let cashCurrent =  parseFloat(this.form.value.paymentDelivered);
     cashCurrent = ( isNaN(cashCurrent) || cashCurrent === null) ?  this.paymentDelivered : cashCurrent;
     this.debt = this.paymentDelivered - cashCurrent;
     this.form.get('amountCredit').setValue(this.debt);
     this.messaje = (this.debt < 0) ? "El monto tiene que ser menor a el total": "";
  }

  save(){
    let data = this.form.value;
    if(data.amountCredit < 0)
    {
      this.form.reset();
      this.dialogRef.close(false);
    }
    else{
      this.dialogRef.close(data);
    }
  }

}