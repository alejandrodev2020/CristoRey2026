import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Classifier } from 'app/modules/configuration/models/classifier';
import { ConfigurationService } from 'app/modules/configuration/services/configuration.service';
import { DateFormatPipe } from 'app/shared/tools/pipe/date-format.pipe';

@Component({
  selector: 'warehouse-product-report-filter',
  templateUrl: './warehouse-product-report-filter.component.html',
  styleUrls: ['./warehouse-product-report-filter.component.scss']
})
export class WarehouseProductReportFilterComponent {
  form: FormGroup;
  listCategory : Classifier[] = [];
  
  @Output('emitQuery')
  change : EventEmitter<any> = new EventEmitter<any>();
  constructor(private fb: FormBuilder,private pipeDate: DateFormatPipe,
    private service : ConfigurationService){

      this.form = this.fb.group({
        name: [null],           
        categoryId: [null],  
        dateInit: [null],      
        dateEnd : [null],  
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
    let queryString = '&';

    if(filter.name != null){
      queryString += ((queryString.length > 1)?'&':'') + 'Name='+  filter.name;
    }
    if(filter.categoryId != null){
        queryString += ((queryString.length > 1)?'&':'') + 'CategoryId='+  filter.categoryId;
    }
    if(filter.moreFew != null){
      queryString += ((queryString.length > 1)?'&':'') + 'ButFew='+ filter.moreFew;
    }
    if (filter.dateInit != null && filter.dateEnd != null) {
      queryString += '&DateInit=' + this.pipeDate.transform(filter.dateInit, 'YYYY-MM-dd');
      queryString += '&DateEnd=' + this.pipeDate.transform(filter.dateEnd, 'YYYY-MM-dd');
    }

    this.change.emit(queryString);   
  }
  
  clean(){
    this.form.get('name').setValue(null);
    this.form.get('categoryId').setValue(null);
    this.form.get('moreFew').setValue(null);
    this.form.get('dateInit').setValue(null);
    this.form.get('dateEnd').setValue(null);
    this.change.emit('');  
 }
}
