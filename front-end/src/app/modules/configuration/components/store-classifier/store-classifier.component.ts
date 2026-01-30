import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Client } from 'app/modules/client/models/client';
import { ConfigurationService } from '../../services/configuration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-store-classifier',
  templateUrl: './store-classifier.component.html',
  styleUrls: ['./store-classifier.component.scss']
})
export class StoreClassifierComponent implements OnInit {


  id:number;
  myClient : Client;
  form: FormGroup;
  nameClassifier : string ='';
  pathClassifier : string ='';
  isCreate : boolean = true;
  isSaving :boolean = false;
  constructor(  private dialogRef: MatDialogRef<any>,
                private service: ConfigurationService,
                @Inject(MAT_DIALOG_DATA) data,
                private router: Router,
                private fb: FormBuilder
                )
  {
    this.form = this.fb.group({
      id : [null],
      name : [null,[Validators.required]],
      description : [null],
      isActive : [true,[Validators.required]]
    });

    this.nameClassifier = data.classifier;
    this.pathClassifier = data.pathClassifier;
    this.id = data.id;
    if(this.id>0)
    {
      this.isCreate = false;
      this.form.get('id').setValue(data.data.id);
      this.form.get('name').setValue(data.data.name);
      this.form.get('description').setValue(data.data.description);
      this.form.get('isActive').setValue(data.data.isActive);
    }

  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close(true);
  }

  control(key: string): FormControl {
    return this.form.controls[key] as FormControl;
  }



  save(){
    this.isSaving = true;
    let messaje = this.isCreate ? 'Regístro' : 'Actualización';
    if (!this.form.valid) {
      return;
    }
 
    let data: any = this.form.value;
    data.id = this.id;
    this.service.store(data,this.pathClassifier).subscribe((resp) => {
      this.dialogRef.close(resp);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Su '+ messaje + 'se realizo con exito!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

}
