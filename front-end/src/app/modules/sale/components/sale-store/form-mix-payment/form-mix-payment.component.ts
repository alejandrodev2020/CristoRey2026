import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'app/modules/client/models/client';
import { PettyCashOverviewComponent } from 'app/modules/petty-cash/components/petty-cash-close/petty-cash-overview/petty-cash-overview.component';
import { PettyCashService } from 'app/modules/petty-cash/services/petty-cash.service';
import { SecurityService } from 'app/modules/security/services/security.service';
import { map, Observable, startWith } from 'rxjs';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-form-mix-payment',
  templateUrl: './form-mix-payment.component.html',
  styleUrls: ['./form-mix-payment.component.scss']
})
export class FormMixPaymentComponent implements OnInit {


    id:number;
    myClient : Client;
    form: FormGroup;
    options: any[] = [];
    nameClassifier : string ='';
    pathClassifier : string ='';
    isCreate : boolean = true;
    amountTotal : number = 0;
    ingresTotal : number = 0;
    filteredOptions: Observable<string[]>;
    constructor(  private dialogRef: MatDialogRef<any>,
                  private serviceUser : SecurityService,
                  private servicePettyCash : PettyCashService,
                  @Inject(MAT_DIALOG_DATA) data,
                  public dialog: MatDialog,
                  private fb: FormBuilder
                  )
    {
      this.amountTotal = data.amountTotal;
      this.form = this.fb.group({
        amountCahs : [null],
        amountQr : [null],
        amountCard : [null],
      });

      this.id = data.id;
    //   this.form.get('id').setValue(data.id);
    //   this.form.get('userAdminId').setValue(1);
      this.serviceUser.getListUserAdmin().subscribe((ele : any)=>{
        this.options = ele;
      });
    //   this.filteredOptions = this.form.get('userName').valueChanges.pipe(
    //     startWith(''),
    //     map(value => this._filter(value || '')),
    //   );

    }

    getPosts(data : any){
    //   this.form.get('userName').setValue(data.firstName + ' '+ data.lastName);
    //   this.form.get('userAdminId').setValue(data.id);
    }

    changeEmployee(){
    }

    ngOnInit(): void {
    }

    private _filter(value: any): any[] {
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.firstName.toLowerCase().includes(filterValue));
    }

    close(){
      this.dialogRef.close(true);
    }
    cancelStore(){
      this.dialogRef.close(null);
    }

    overviewPettyCash(pettyCashId : number){
      const dialogRef = this.dialog.open(PettyCashOverviewComponent, {
        panelClass: 'custom-container',
        data: {id: pettyCashId},
     });

     dialogRef.afterClosed().subscribe(result => {
      let tes = result;
     });
    }


    calculateSubTotal(){
        let amountCash = parseFloat(this.form.get('amountCahs').value) || 0;
        let amountQr = parseFloat(this.form.get('amountQr').value) || 0;
        let amountCard = parseFloat(this.form.get('amountCard').value) || 0;
        let subTotal = amountCash + amountQr + amountCard;
        this.ingresTotal = subTotal;
    }


    save(){

      if (!this.form.valid) {
        return alert('datos invalidos');
      }
      let data: any = this.form.value;
      this.dialogRef.close(data);

    }

  }

