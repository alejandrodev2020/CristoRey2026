import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'app/modules/client/models/client';
import { Classifier } from 'app/modules/configuration/models/classifier';
import {MatSnackBar} from "@angular/material/snack-bar";
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-select-warehouse',
  templateUrl: './select-warehouse.component.html',
  styleUrls: ['./select-warehouse.component.scss']
})
export class SelectWarehouseComponent implements OnInit {


  id:number;
  myClient : Client;
  listWarehouse : any[];
  form: FormGroup;
  nameClassifier : string ='';
  pathClassifier : string ='';
  isCreate : boolean = true;
  constructor(  private dialogRef: MatDialogRef<any>,
                private serviceWarehouse : WarehouseService,
                private fb: FormBuilder,
                private snackBar: MatSnackBar
                ) 
  {
    this.form = this.fb.group({
      warehouseId : [15, [Validators.required]],
    });


  }

  ngOnInit(): void {
    this.serviceWarehouse.getAllWarehouse().subscribe((response : Classifier[])=> {
      this.listWarehouse = response;
    });
  }

  close(){
    this.dialogRef.close(true);
  }


  save(){
    if (!this.form.valid) {
      return alert('datos invalidos');
    }
      this.snackBar.open("Almacen seleccionado", "", {
        duration: 1500,
        horizontalPosition: "end",
        verticalPosition: "top"
      }
      );
      this.dialogRef.close(this.form.value);
      // Swal.fire({
      //   position: 'top-end',
      //   icon: 'success',
      //   title: 'Almacen seleccionado con exito!',
      //   showConfirmButton: false,
      //   timer: 1500
      // });
  }

}
