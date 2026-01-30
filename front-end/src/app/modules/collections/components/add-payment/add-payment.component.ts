import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SaleService } from 'app/modules/sale/services/sale.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent  {

  form: FormGroup;
  id:number;
  paymentDelivered : number;
  debt : number = 0;
  messaje : string;


  constructor(private dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) data,
              private router: Router,
              private service : SaleService,
              private fb: FormBuilder)
       {
        this.form = this.fb.group({
        paymentDelivered : [null,[Validators.required]],
        amountCredit : [null],
        });
        this.paymentDelivered = data.amountCredit;
        this.id = data.id;
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
      let parseData = {

          amount: data.paymentDelivered,
          pettyCashId: 2

      }
      this.service.savePayment(this.id,parseData).subscribe((res: number | null)=>{
        if(res > 0 ){
          this.dialogRef.close(res);
        }
        else{
          this.dialogRef.close(0);
        }
      });
    }
  }

}
