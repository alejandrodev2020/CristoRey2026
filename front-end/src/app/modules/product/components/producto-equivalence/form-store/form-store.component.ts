import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'app/modules/product/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-store',
  templateUrl: './form-store.component.html',
  styleUrls: ['./form-store.component.scss']
})
export class FormStoreComponent implements OnInit {

  form: FormGroup;
  dataInput: any;
  itemSelect : any;
  currentEquivalence : any; 
  isUpdate : boolean = false;
  disabledButtoon:boolean = false
  unitMeasurementDefault : boolean = false;
  listUnitMeasurement : any[]; 
  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data
  ){
    this.dataInput = data;
    this.itemSelect = data.dataRequest; 
    this.currentEquivalence = data.dataRequest.equivalenceItem;
    this.createListUnitMeasurement();
    this.form = this.fb.group({
      productId: this.dataInput.productId,  
      ProductEquivalenceId: [null],  
      unitMeasurementMotiveId: this.itemSelect.id,  
      unitMeasurementMotiveName: this.itemSelect.name,  
      unitMeasurementFather : [null,[Validators.required]],
      unitMeasurementChild : [null,[Validators.required]],
      amount : [null,[Validators.maxLength(15)]],
      suggestedPricePurchase : [null,[Validators.required]],
      suggestedPriceSale : [null,[Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.itemSelect?.equivalenceItem) {
      this.isUpdate = true;
      this.setDataItem();
    }
  }

  createListUnitMeasurement(){
      this.listUnitMeasurement = this.dataInput.listActive.filter(item => item.exist == true);
      this.listUnitMeasurement.push(this.dataInput.dataRequest);
  }

  setDataItem(){
    this.form.get('unitMeasurementFather').setValue(this.currentEquivalence?.unitMeasurementFather);
    this.form.get('unitMeasurementChild').setValue(this.currentEquivalence?.unitMeasurementChild);
    this.form.get('suggestedPricePurchase').setValue(this.currentEquivalence?.suggestedPricePurchase);
    this.form.get('suggestedPriceSale').setValue(this.currentEquivalence?.suggestedPriceSale);
    this.form.get('ProductEquivalenceId').setValue(this.currentEquivalence?.id);
    this.form.get('amount').setValue(this.currentEquivalence?.amount);

    if(this.currentEquivalence?.unitMeasurementFather 
      === this.currentEquivalence?.unitMeasurementChild ){
        this.unitMeasurementDefault = true;
    }
  }

  close(){
    this.dialogRef.close(false);
  }
  cancelStore(){
    this.dialogRef.close(false);
  }

  customValidation() :boolean{
    if(!this.unitMeasurementDefault){
        let father = this.form.get('unitMeasurementFather').value;
        let child = this.form.get('unitMeasurementChild').value;
        if(father === child){
          this.showMessageError('No pueden ser iguales las unidades!');
          return false;
        }
        if(father !== this.itemSelect.id && child !== this.itemSelect.id){
          this.showMessageError('la unidad de medida a editar tiene que ser, orgien o destino');
          return false;
        }
    }
    else{

    }
    return true;
  }

  showMessageError(text : string){

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text
    });
  }

  showMessageSuccess(text : string){
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: text,
      showConfirmButton: false,
      timer: 1500
    });
  }

  saveData(){
    if (!this.form.valid) {
      this.showMessageError('Datos erroneos!');
    }
    else {
      this.disabledButtoon = true;
      let data = this.form.value;
      if( this.customValidation()){
          if(this.isUpdate){
            Swal.fire({
              title: "¿Seguro en actualizar el  precio?",
              text: "Recuerda que los precios se actualizarán en todas las  sucursales!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#A2C747",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sí, actualizar!"
            }).then((result) => {
              if (result.isConfirmed) {
                this.service.updateEquivalence(data).subscribe((response)=>{
                  this.showMessageSuccess('Se Actualizo con exito!');
                  this.dialogRef.close(true);
                });
         
              }
            });
        }
        else{
              this.service.storeEquivalence(data).subscribe((response)=>{
                this.showMessageSuccess('Se Registro con exito!');
                this.dialogRef.close(true);
              });
         }       
      }
    }

  }

}
