import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'app/modules/client/models/client';
import { Classifier } from 'app/modules/configuration/models/classifier';
import { MatSnackBar } from "@angular/material/snack-bar";
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-movement-only-item',
  templateUrl: './form-movement-only-item.component.html',
  styleUrls: ['./form-movement-only-item.component.scss']
})
export class FormMovementOnlyItemComponent implements OnInit {


  id: number;
  myClient: Client;
  listWarehouse: any[];
  form: FormGroup;
  nameClassifier: string = '';
  pathClassifier: string = '';
  isCreate: boolean = true;
  product: any = null;
  image: string = null;
  checkUnitMeasurement: any = null;
  amountAvailable: number = null;
  listUnitMeasurement: any[] = [];
  message: string = '';
  isValidData: boolean = false;
  activeAlert: boolean = false;

  constructor(private dialogRef: MatDialogRef<any>,
    private serviceWarehouse: WarehouseService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.product = data.data;
    this.amountAvailable = this.product.amount;
    this.checkUnitMeasurement = this.product.unitMeasurement;
    this.listUnitMeasurement = data.equivalences;
    this.image = `data:image/png;base64,${this.product.product.picture}`;
    this.form = this.fb.group({
      warehouseOriginId: [this.product.warehouseId, [Validators.required]],
      warehouseDestinationId: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      noteRequest: [null],
    });


  }

  ngOnInit(): void {
    this.serviceWarehouse.getAllWarehouse().subscribe((response: Classifier[]) => {
      this.listWarehouse = response;
    });
  }

  close() {
    this.dialogRef.close(true);
  }

  addQuantity(currentItem: any) {
    this.listUnitMeasurement.map((item) => {
      item.check = (item.unitMeasurementMotive.name === currentItem.unitMeasurementMotive.name);
    });

    this.product.unitMeasurement;
    this.setAvaliable();
    this.validateStockAvailable();
  }
  setAvaliable() {
    let currentUnitMeasurement = this.listUnitMeasurement.filter((item) => (item.check))[0];
    this.checkUnitMeasurement = currentUnitMeasurement.unitMeasurementMotive;
    this.amountAvailable = parseFloat((this.product.amount / currentUnitMeasurement.factor).toFixed(2));
  }


  save() {
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
  }
  validateStockAvailable() {
    let amount = parseFloat(this.form.get('amount').value);
    let available = this.amountAvailable;
    let name = this.checkUnitMeasurement.name;
    if (amount > available) {
      this.message = 'Stock Disponible : ' + available + ' ' + name;
      this.isValidData = false;
    }
    else {
      this.message = '';
      this.isValidData = true;
    }
  }

  sendRequeset() {
    this.activeAlert = false;
    let data = this.form.value;
    if ((data.warehouseOriginId !== data.warehouseDestinationId)) {

      if (this.isValidData) {
        data.details = [
          {
            productId: this.product.product.id,
            amount: parseFloat(data.amount),
            amountOrigin: this.product.unitMeasurement.id,
            unitMeasurementId: this.checkUnitMeasurement.id
          }
        ];
        delete data.amount;
        this.activeAlert = false;
        this.serviceWarehouse.createMovementRequest(data).subscribe((response: any) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Solicitud creada exitosamente!",
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close(true);
        });
      }
      else {
        this.activeAlert = true;
      }


    }
    else {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pueden hacer traspaso al mismo almacen!',
      });

    }

  }

}
