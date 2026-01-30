import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'app/modules/client/models/client';
import { PettyCashService } from 'app/modules/petty-cash/services/petty-cash.service';
import { SecurityService } from 'app/modules/security/services/security.service';
import { map, Observable, startWith } from 'rxjs';
import Swal from 'sweetalert2';
import { PettyCashOverviewComponent } from '../petty-cash-overview/petty-cash-overview.component';

@Component({
  selector: 'app-close-seller',
  templateUrl: './close-seller.component.html',
  styleUrls: ['./close-seller.component.scss']
})
export class CloseSellerComponent implements OnInit {


  id:number;
  myClient : Client;
  form: FormGroup;
  options: any[] = [];
  nameClassifier : string ='';
  pathClassifier : string ='';
  isCreate : boolean = true;
  filteredOptions: Observable<string[]>;
  constructor(  private dialogRef: MatDialogRef<any>,
                private serviceUser : SecurityService,
                private servicePettyCash : PettyCashService,
                @Inject(MAT_DIALOG_DATA) data,
                public dialog: MatDialog,
                private fb: FormBuilder
                ) 
  { 
    this.form = this.fb.group({
      id : [null],
      amountSale : [null],
      note : [null],
      userAdminId : [null],
      userName : [null],
    });

    this.id = data.id.id;
    this.form.get('id').setValue(data.id.id);
    this.serviceUser.getListUserAdmin().subscribe((ele : any)=>{
      this.options = ele;
    });
    this.filteredOptions = this.form.get('userName').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }

  getPosts(data : any){
    this.form.get('userName').setValue(data.firstName + ' '+ data.lastName);
    this.form.get('userAdminId').setValue(data.id);
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
    this.dialogRef.close(true);
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

  save(){
    let messaje = this.isCreate ? 'Regístro' : 'Actualización';
    if (!this.form.valid) {
      return alert('datos invalidos');
    }
    let data: any = this.form.value;
    data.id = this.id;
    this.servicePettyCash.closePettyCash(data.id,data).subscribe((resp) => {
      this.dialogRef.close(true);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Su '+ messaje + 'se realizo con exito!',
        showConfirmButton: false,
        timer: 1500
      });
      this.overviewPettyCash(data.id);
    });
  }

}
