import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Client } from 'app/modules/client/models/client';
import { ConfigurationService } from 'app/modules/configuration/services/configuration.service';
import { SecurityService } from 'app/modules/security/services/security.service';
import { map, Observable, startWith } from 'rxjs';

import Swal from 'sweetalert2';
import { PettyCashService } from '../../services/petty-cash.service';


@Component({
  selector: 'app-add-operators',
  templateUrl: './add-operators.component.html',
  styleUrls: ['./add-operators.component.scss']
})
export class AddOperatorsComponent implements OnInit, AfterViewInit {


  id:number;
  myClient : Client;
  form: FormGroup;
  nameClassifier : string ='';
  pathClassifier : string ='';
  isCreate : boolean = true;
  isSaving :boolean = false;
  options: any[] = [];
  filteredOptions: Observable<string[]>;
  
  constructor(  private dialogRef: MatDialogRef<any>,
                private service: SecurityService,
                private servicePettyCash : PettyCashService,
                @Inject(MAT_DIALOG_DATA) data,
                private router: Router,
                private fb: FormBuilder
                )
  {
    this.form = this.fb.group({
      id : [null],
      pettyCashId : [null],
      name : [null,[Validators.required]],
      description : [null],
      isActive : [true,[Validators.required]],
      clientName: [null,[Validators.required,Validators.maxLength(50)]],
      userIdSeller: [null],
    });

    this.filteredOptions = this.form.get('clientName').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.id = data.id;
    this.form.get('pettyCashId').setValue(data.id);

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.service.getListUser().subscribe((ele : any)=>{
        this.options = ele;
      });
    }, 100); 
  }

  changeEmployee(){
  }
  getPosts(data : any){
    this.form.get('clientName').setValue(data.firstName + ' '+ data.lastName);
    this.form.get('userIdSeller').setValue(data.id);
  }


  ngOnInit(): void {
 
  }

  private _filter(value: any): any[] {
    if (!value || value === "") {
      return this.options;
    }
  
    const filterValue = value.toLowerCase();
    return this.options.filter(option => 
      option.firstName.toLowerCase().includes(filterValue)
    );
  }


  close(){
    this.dialogRef.close(true);
  }

  control(key: string): FormControl {
    return this.form.controls[key] as FormControl;
  }



  save(){
    this.isSaving = true;
    let data: any = this.form.value;
    data.id = this.id;
    this.servicePettyCash.saveOperators(data).subscribe((resp) => {
      this.dialogRef.close(resp);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Su colaborador se agrego con exito!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

}
