import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'app/modules/client/services/client.service';
import { Classifier } from 'app/modules/configuration/models/classifier';
import { SecurityService } from 'app/modules/security/services/security.service';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';
import { DateFormatPipe } from 'app/shared/tools/pipe/date-format.pipe';
import { map, Observable, startWith } from 'rxjs';


@Component({
  selector: 'earning-item-detail-report',
  templateUrl: './earning-item-detail-report.component.html',
  styleUrls: ['./earning-item-detail-report.component.scss']
})
export class EarningItemDetailReportComponent  implements AfterViewInit {

  listWarehouse : Classifier[] = [];
  form: FormGroup;
  filteredOptions: Observable<string[]>;
  listAuthfilteredOptions: Observable<string[]>;
  options: any[] = [];
  listUserOptions: any[] = [];
  optionsDate = [
    { value: 1, label: 'Hoy' },
    { value: 2, label: 'Ayer' },
    { value: 3, label: 'Fechas' }
  ];

  @Output('emitQuery')
  change : EventEmitter<any> = new EventEmitter<any>();
  constructor(private fb: FormBuilder,
              private pipeDate : DateFormatPipe,
              private serviceClient: ClientService,
              private serviceWarehouse: WarehouseService,
              private serviceSecurity : SecurityService){

                this.form = this.fb.group({
                  myControl: ['Todos'],
                  userName: ['Todos'],
                  clientId: [0],
                  userId: [0],
                  name: [null],      
                  warehouseId: [0],      
                  typeId: [1],      
                  dateInit: [null],      
                  dateEnd: [null],      
                });

                this.filteredOptions = this.form.get('myControl').valueChanges.pipe(
                  startWith(''),
                  map(value => this._filter(value || '')),
                );          


                this.listAuthfilteredOptions = this.form.get('userName').valueChanges.pipe(
                  startWith(''),
                  map(value => this._filterUser(value || '')),
                );         


      this.setListWarehouse();
      this.setClient();
      this.setUsers();
      this.setDateCurrentToday();
  }
  ngAfterViewInit(): void {
    this.save();
  }

  control(key: string): FormControl {
    return this.form.controls[key] as FormControl;
  }
  setListWarehouse(){
    this.serviceWarehouse.getAllWarehouse().subscribe((response: Classifier[]) => {
      const newItem: Classifier = { id: 0, name: 'Todos', description: 'Todos', isActive: true };
      this.listWarehouse = [newItem, ...response];
    });
  }

  setClient(){
    this.serviceClient.getAllClient().subscribe((ele: any) => {
      this.options = ele;
    });
  }
  
  setUsers(){
    this.serviceSecurity.getListUser().subscribe((ele: any) => {
      this.listUserOptions = ele;
    });
  }

  selectionData(event : any){
    if(event?.value === 1){
        this.setDateCurrentToday();
    }
    if(event?.value === 2 ){
       this.setDateYesterday();
    }

  }

  setDateCurrentToday(){
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    const formattedDate = localDate.toISOString().split('T')[0]; 
    this.form.get('dateInit').setValue(formattedDate);
    this.form.get('dateEnd').setValue(formattedDate);
  }

  setDateYesterday() {
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const localDate = new Date(yesterday.getTime() - yesterday.getTimezoneOffset() * 60000);
    const formattedDate = localDate.toISOString().split('T')[0];
    this.form.get('dateInit').setValue(formattedDate);
    this.form.get('dateEnd').setValue(formattedDate);
  }

  private _filter(value: any): any[] {
    value = (value?.firstName) ? value?.firstName : value;
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.firstName.toLowerCase().includes(filterValue));
  }
  private _filterUser(value: any): any[] {
    value = (value?.firstName) ? value?.firstName : value;
    const filterValue = value.toLowerCase();
    return this.listUserOptions.filter(option => option.firstName.toLowerCase().includes(filterValue));
  }

  onSelectionChange(select: any) {
    this.form.get('myControl').setValue(select?.option?.value?.firstName + ' ' + select?.option?.value?.lastName);
    this.form.get('clientId').setValue(select?.option?.value?.id);
  }

  onSelectionChangeUser(select: any) {
    this.form.get('userName').setValue(select?.option?.value?.firstName + ' ' + select?.option?.value?.lastName);
    this.form.get('userId').setValue(select?.option?.value?.id);
  }


  save(){
    const filter = this.form.value;
    let querySting = '&';
    if(filter.dateInit != null && filter.dateEnd != null ){
      querySting =  '&InitDate='+  this.pipeDate.transform(filter.dateInit,'YYYY-MM-dd');
      querySting +=  '&EndDate='+  this.pipeDate.transform(filter.dateEnd,'YYYY-MM-dd');
    }
    if(filter.warehouseId != null && filter.warehouseId > 0){
        querySting += ((querySting.length > 1)?'&':'') + 'WarehouseId='+  filter.warehouseId;
    }
    if(filter.typeId != null && filter.typeId > 0){
      querySting += ((querySting.length > 1)?'&':'') + 'TypeId='+ filter.typeId;
    }
    if(filter.name != null){
      querySting += ((querySting.length > 1)?'&':'') + 'Name='+  filter.name;
    }
    if(filter.clientId != null && filter.clientId > 0){
      querySting += ((querySting.length > 1)?'&':'') + 'ClientId='+  filter.clientId;
    }

    if(filter.userId != null && filter.userId > 0){
      querySting += ((querySting.length > 1)?'&':'') + 'AuthUserId='+  filter.userId;
    }
    let data = {
      query : querySting,
      dataParamsFilter : filter
    }
   
    this.change.emit(data);   
  }
  clean(){
      this.form.get('name').setValue(null);
      this.form.get('warehouseId').setValue(0);
      this.form.get('typeId').setValue(1);
      this.form.get('clientId').setValue(0);
      this.form.get('myControl').setValue('Todos');
      this.form.get('userName').setValue('Todos');
      this.setDateCurrentToday();
      this.save();
  }

}
