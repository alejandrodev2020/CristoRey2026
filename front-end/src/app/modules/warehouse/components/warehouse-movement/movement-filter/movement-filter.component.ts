import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'app/modules/client/services/client.service';
import { Classifier } from 'app/modules/configuration/models/classifier';
import { SaleService } from 'app/modules/sale/services/sale.service';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';
import { DateFormatPipe } from 'app/shared/tools/pipe/date-format.pipe';
import { map, Observable, startWith } from 'rxjs';


@Component({
  selector: 'movement-filter',
  templateUrl: './movement-filter.component.html',
  styleUrls: ['./movement-filter.component.scss']
})
export class MovementFilterComponent  {

    listWarehouse : Classifier[] = [];
    listSaleStatus : Classifier[] = [];
    form: FormGroup;
    filteredOptions: Observable<string[]>;
    options: any[] = [];


    @Output('emitQuery')
    change : EventEmitter<any> = new EventEmitter<any>();
    constructor(private fb: FormBuilder,
                private pipeDate : DateFormatPipe,
                private serviceClient: ClientService,
                private serviceWarehouse: WarehouseService,
                private serviceSale : SaleService){

                  this.form = this.fb.group({
                    myControl: [null],
                    clientId: [1],
                    name: [null],
                    warehouseId: [null],
                    // statusId: [null],
                    typeId: [null],
                    dateInit: [null],
                    dateEnd: [null],
                  });

                  this.filteredOptions = this.form.get('myControl').valueChanges.pipe(
                    startWith(''),
                    map(value => this._filter(value || '')),
                  );
        this.setListWarehouse();
        this.setListStatus();
        this.setClient();
    }

    control(key: string): FormControl {
      return this.form.controls[key] as FormControl;
    }
    setListWarehouse(){
      this.serviceWarehouse.getAllWarehouse().subscribe((response: Classifier[]) => {
        this.listWarehouse = response;
      });
    }
    setListStatus(){
      this.serviceSale.getSaleStatus().subscribe((response: Classifier[]) => {
        this.listSaleStatus = response;
      });
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
      this.form.get('myControl').setValue(select?.option?.value?.firstName + ' ' + select?.option?.value?.lastName);
      this.form.get('clientId').setValue(select?.option?.value?.id);
    }


    save(){
      const filter = this.form.value;

      let querySting = '&';
      if(filter.dateInit != null && filter.dateEnd != null ){
        querySting =  '&DateInit='+  this.pipeDate.transform(filter.dateInit,'YYYY-MM-dd');
        querySting +=  '&DateEnd='+  this.pipeDate.transform(filter.dateEnd,'YYYY-MM-dd');
      }
      if(filter.warehouseId != null){
          querySting += ((querySting.length > 1)?'&':'') + 'WarehouseId='+  filter.warehouseId;
      }
      // if(filter.statusId != null){
      //   querySting += ((querySting.length > 1)?'&':'') + 'StatusId='+  filter.statusId;
      // }
      if(filter.typeId != null){
        querySting += ((querySting.length > 1)?'&':'') + 'TypeId='+ filter.typeId;
      }
      if(filter.name != null){
        querySting += ((querySting.length > 1)?'&':'') + 'Name='+  filter.name;
      }
      if(filter.clientId != null){
        querySting += ((querySting.length > 1)?'&':'') + 'ClientId='+  filter.clientId;
      }
      this.change.emit(querySting);
    }
    clean(){
        this.form.get('name').setValue(null);
        this.form.get('warehouseId').setValue(null);
        // this.form.get('statusId').setValue(null);
        this.form.get('typeId').setValue(null);
        this.form.get('dateInit').setValue(null);
        this.form.get('dateEnd').setValue(null);
        this.form.get('clientId').setValue(null);
        this.form.get('myControl').setValue(null);
        this.change.emit('');
    }

  }
