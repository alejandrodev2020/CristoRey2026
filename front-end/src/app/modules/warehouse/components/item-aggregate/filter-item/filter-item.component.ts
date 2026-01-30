import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Classifier } from 'app/modules/configuration/models/classifier';
import { ConfigurationService } from 'app/modules/configuration/services/configuration.service';
import { ProductService } from 'app/modules/product/services/product.service';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';

@Component({
  selector: 'filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss']
})
export class FilterItemComponent {
  form: FormGroup;
  listCategory : Classifier[] = [];
  
  @Output('emitQuery')
  change : EventEmitter<any> = new EventEmitter<any>();
  constructor(private fb: FormBuilder,
    private serviceWarehouse: WarehouseService,
    private serviceProduct: ProductService,
    private service : ConfigurationService){

      this.form = this.fb.group({
        name: [null],           
        categoryId: [null],      
        moreFew: [false],      
      });
         
  this.setListCategory();

}

setListCategory(){
  this.service.getAllProductCategory().subscribe((resp : Classifier[])=>{
    this.listCategory = resp;
  })
}


  control(key: string): FormControl {
    return this.form.controls[key] as FormControl;
  }

  save(){
    const filter = this.form.value;
    filter.moreFew = (!filter.moreFew)?null:filter.moreFew;
    let querySting = '&';
    if(filter.name != null){
      querySting += ((querySting.length > 1)?'&':'') + 'Name='+  filter.name;
    }
    if(filter.categoryId != null){
        querySting += ((querySting.length > 1)?'&':'') + 'CategoryId='+  filter.categoryId;
    }
    if(filter.moreFew != null){
      querySting += ((querySting.length > 1)?'&':'') + 'ButFew='+ filter.moreFew;
    }

    this.change.emit(querySting);   
  }


  clean(){
    this.form.get('name').setValue(null);
    this.form.get('categoryId').setValue(null);
    this.form.get('moreFew').setValue(null);
    this.change.emit('');  
}









}
