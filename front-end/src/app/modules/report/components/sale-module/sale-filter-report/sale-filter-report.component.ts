import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'app/modules/client/services/client.service';
import { Classifier } from 'app/modules/configuration/models/classifier';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';
import { DateFormatPipe } from 'app/shared/tools/pipe/date-format.pipe';
import { map, Observable, startWith } from 'rxjs';



@Component({
  selector: 'sale-filter-report',
  templateUrl: './sale-filter-report.component.html',
  styleUrls: ['./sale-filter-report.component.scss']
})
export class SaleFilterReportComponent implements AfterViewInit{

  listWarehouse : Classifier[] = [];
  form: FormGroup;
  filteredOptions: Observable<string[]>;
  options: any[] = [];
  inputsDateVisible: boolean = false;
  optionsDate = [
    { value: 1, label: 'Hoy' },
    { value: 2, label: 'Ayer' },
    { value: 3, label: 'Fechas' }
  ];
  optionsSaleType = [
    { value: 0, label: 'Todos' },
    { value: 1, label: 'Contado' },
    { value: 2, label: 'Credito' }
  ];


  @Output('emitQuery')
  change : EventEmitter<any> = new EventEmitter<any>();
  constructor(private fb: FormBuilder,
              private pipeDate : DateFormatPipe,
              private serviceClient: ClientService,
              private serviceWarehouse: WarehouseService){

                this.form = this.fb.group({
                  myControl: [null],
                  clientId: [null],
                  name: [null],      
                  warehouseId: [0],      
                  warehouseName: ["Todos"],      
                  typeId: [0],      
                  dateType: [1],      
                  dateInit: [null],      
                  dateEnd: [null],      
                });

                this.filteredOptions = this.form.get('myControl').valueChanges.pipe(
                  startWith(''),
                  map(value => this._filter(value || '')),
                );          
      this.setDateOffset(0);
      this.setListWarehouse();
      this.setClient();
  }

  ngAfterViewInit(): void {
    this.save();
  }


  control(key: string): FormControl {
    return this.form.controls[key] as FormControl;
  }


  setListWarehouse(){
    this.serviceWarehouse.getAllWarehouse().subscribe((response: Classifier[]) => {
      const todosWarehouse: Classifier = {
        id: 0,
        name: 'Todos',
        description: 'Todos',
        isActive: true
      };
      this.listWarehouse = [todosWarehouse, ...response];
    });
  }

  selectionWarehouse(value : any){
    const selectedWarehouse = this.listWarehouse.find((item) => (item.id) === value.value);
    if(selectedWarehouse){
      this.form.get('warehouseName').setValue(selectedWarehouse?.name);
    }
    else{
      this.form.get('warehouseName').setValue("Todos");
    }
  }

  setClient(){
    this.serviceClient.getAllClient().subscribe((ele: any) => {
      this.options = ele;
    });
  }

  private _filter(value: any): any[] {
    value = (value?.firstName) ? value?.firstName : value;
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.firstName.toLowerCase().includes(filterValue));
  }

  onSelectionChange(select: any) {
    this.form.get('myControl').setValue(select?.option?.value?.firstName + ' ' + (select?.option?.value?.lastName || ''));
    this.form.get('clientId').setValue(select?.option?.value?.id);
  }
  
  selectionData(event : any){
    if(event?.value === 1){
      this.setDateOffset(0);
      this.inputsDateVisible = false;
    }
    if(event?.value === 2){
      this.setDateOffset(1);
      this.inputsDateVisible = false;
    }
    if(event?.value === 3){
      this.setDateOffset(3);
      this.inputsDateVisible = true;
    }
 
  }

  setDateOffset(offset) {
    const today = new Date();
    const targetDate = new Date(today.getTime() - offset * 24 * 60 * 60 * 1000); // Calcula la fecha con el offset
    const localDate = new Date(targetDate.getTime() - targetDate.getTimezoneOffset() * 60000); // Ajusta a la zona horaria local
    const formattedDate = localDate.toISOString().split('T')[0]; // Formatea como 'YYYY-MM-DD'
    if(offset === 3){
      this.form.get('dateInit').setValue(null);
      this.form.get('dateEnd').setValue(null);
    }
    
    else{
      this.form.get('dateInit').setValue(formattedDate);
      this.form.get('dateEnd').setValue(formattedDate);
    }
  }



  save(){
    const filter = this.form.value;
    let querySting = '&';
    if(filter.dateInit != null && filter.dateEnd != null ){
      querySting =  '&DateInit='+  this.pipeDate.transform(filter.dateInit,'YYYY-MM-dd');
      querySting +=  '&DateEnd='+  this.pipeDate.transform(filter.dateEnd,'YYYY-MM-dd');
    }
    if(filter.warehouseId != null  && filter.warehouseId > 0 ){
        querySting += ((querySting.length > 1 )?'&':'') + 'WarehouseId='+  filter.warehouseId;
    }
    if(filter.typeId != null && filter.typeId > 0 ){
      querySting += ((querySting.length > 1)?'&':'') + 'TypeId='+ filter.typeId;
    }
    if(filter.name != null){
      querySting += ((querySting.length > 1)?'&':'') + 'Name='+  filter.name;
    }
    if(filter.clientId != null){
      querySting += ((querySting.length > 1)?'&':'') + 'ClientId='+  filter.clientId;
    }
  
    let QueryFilterObj = {
       dataForm : filter,
       queryString : querySting
    }
    this.change.emit(QueryFilterObj);   
  }

  clean(){
      this.form.get('name').setValue(null);
      this.form.get('warehouseId').setValue(0);
      this.form.get('typeId').setValue(0);
      this.form.get('clientId').setValue(null);
      this.form.get('myControl').setValue(null);
      this.form.get('dateType').setValue(1);
      this.inputsDateVisible = false;
      this.setDateOffset(0);
      this.save();

  }

}
