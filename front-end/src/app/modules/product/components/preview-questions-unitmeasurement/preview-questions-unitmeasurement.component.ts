import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Provider } from 'app/modules/provider/models/provider';
import { image } from 'app/modules/product/models/image-default.const';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';
import { Warehouse } from 'app/modules/warehouse/models/warehouse';
import { ConfigurationService } from 'app/modules/configuration/services/configuration.service';
import { Classifier } from 'app/modules/configuration/models/classifier';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preview-questions-unitmeasurement',
  templateUrl: './preview-questions-unitmeasurement.component.html',
  styleUrls: ['./preview-questions-unitmeasurement.component.scss']
})
export class PreviewQuestionsUnitmeasurementComponent implements OnInit {


  id:number;
  pathBanner = 'assets/images/ui/unit.png'
  myProvider : Warehouse;
  listUnitMeasurement : any[];
  unitMeasurementDefault : number;
  listSelect:equivalenceItem[] = [];
  unitsOfMeasurementAllowed : any[] = [];
  productForm: FormGroup;  
  currentProduct:any;
  imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(image);
  constructor(  private dialogRef: MatDialogRef<any>,
                private sanitizer: DomSanitizer,
                private service: ProductService,
                private router: Router,
                private serviceConfiguration : ConfigurationService,
                private fb:FormBuilder,
                @Inject(MAT_DIALOG_DATA) data) 
  {
    this.id = data.id;
    this.unitMeasurementDefault = data.unitmeasurementDefault;

    this.productForm = this.fb.group({  
      equivalences: this.fb.array([]) ,  
    }); 
  }
  ngOnInit(): void {
    this.serviceConfiguration.getAllUnitMeasurement().subscribe((response : any[])=> {
      this.listUnitMeasurement = response;
      this.listUnitMeasurement.map((ele : any)=>{
        if(ele.id === this.unitMeasurementDefault)
        {
          ele.check=true
          ele.default = true;
          this.unitsOfMeasurementAllowed.push(ele);
        }
       });
    });

    this.service.getById(this.id).subscribe((resp) =>{
      this.currentProduct = resp;
    })


  }

  gestionaryEquivalences(){
    this.dialogRef.close(true);
    this.router.navigate([`product/product/equivalence/${this.id}`]);
  }

  backTo(){
    this.dialogRef.close(true);
    this.router.navigate([`product/product`]);
  }

  equivalences() : FormArray {  
    return this.productForm.get("equivalences") as FormArray  
  }
  
  addQuantity(item : any) {  
    if(item.id === this.unitMeasurementDefault){
      alert('NO se puede quitar la unidad de medida por defecto');
    }
    else{ 
      this.unitsOfMeasurementAllowed.push(item);
      this.equivalences().push(this.newQuantity(item));  
    }
  } 

  removeQuantity(i:number) {  
    this.equivalences().removeAt(i);  
  } 

  onSubmit10() {  
    let data = this.productForm.value;
    this.service.saveEquivalenceMassive(this.id,data).subscribe((res)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Sus equivalencias se configuraron con exito!',
        showConfirmButton: false,
        timer: 1500
      })
       this.close();
       this.router.navigate(['product/product']);
    })
  }  

  newQuantity(item): FormGroup {  
    return this.fb.group({  
      factor: '',  
    //  unitMeasurementOriginId: this.unitMeasurementDefault,  
      unitMeasurementDestinationId: item.id, 
      unitMeasurementFather : this.unitMeasurementDefault,
      unitMeasurementChild : item.id,
      unitMeasurementMotiveId: item.id,  
      unitMeasurementMotiveName: item.name,  
      suggestedPricePurchase : null,
      suggestedPriceSale : null,
    })  
  }  

  close(){
    this.dialogRef.close(true);
  }

  async setPhoto(data : any){
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }

  SelectUnit(data:any){

   this.validateExistent(data);
    
   this.listUnitMeasurement.map((ele : any)=>{
        if(ele.id === data.id)
        {
          ele.check=true
        }
    });

    let equivalence : equivalenceItem = { origin : data.id, destine : this.unitMeasurementDefault, factor : 1 };
    this.unitsOfMeasurementAllowed.push(data);
    this.listSelect.push(equivalence);
  }

  validateExistent(data:any){
      let exist = this.listSelect.filter((ele)=>{
         return null;
      })
  }

  saveEquivalences(){
    let tes = this.listSelect;

  }


}

export interface equivalenceItem 
{
    origin : number,
    destine : number,
    factor : number
}