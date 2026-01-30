import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'app/modules/client/services/client.service';
import { Classifier } from 'app/modules/configuration/models/classifier';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';
import { DateFormatPipe } from 'app/shared/tools/pipe/date-format.pipe';
import { ToastService } from 'app/shared/services/toast.service';
import { map, Observable, startWith } from 'rxjs';
import { SaleService } from 'app/modules/sale/services/sale.service';

@Component({
  selector: 'filter-collection-gestionary',
  templateUrl: './filter-collection-gestionary.component.html',
  styleUrls: ['./filter-collection-gestionary.component.scss']
})
export class FilterCollectionGestionaryComponent {
  listWarehouse: Classifier[] = [];
  listSaleStatus: Classifier[] = [];
  form: FormGroup;
  filteredOptions: Observable<string[]>;
  options: any[] = [];


  @Output('emitQuery')
  change: EventEmitter<any> = new EventEmitter<any>();
  constructor(private fb: FormBuilder,
    private pipeDate: DateFormatPipe,
    private serviceClient: ClientService,
    private serviceWarehouse: WarehouseService,
    private toastService: ToastService,
    private serviceSale: SaleService) {

    this.form = this.fb.group({
      myControl: [null],
      clientId: [null],
      name: [null],
      typeId:[null],
      warehouseId: [null],
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
  setListWarehouse() {
    this.serviceWarehouse.getAllWarehouse().subscribe((response: Classifier[]) => {
      this.listWarehouse = response;
    });
  }
  setListStatus() {
    this.serviceSale.getSaleStatus().subscribe((response: Classifier[]) => {
      this.listSaleStatus = response;
    });
  }

  setClient() {
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


  save() {
    const allNull = Object.values(this.form.value).every(value => value === null);
    if (!allNull) {
      const filter = this.form.value;
      let queryString = '&';

      if (filter.dateInit != null && filter.dateEnd != null) {
        queryString += '&DateInit=' + this.pipeDate.transform(filter.dateInit, 'YYYY-MM-dd');
        queryString += '&DateEnd=' + this.pipeDate.transform(filter.dateEnd, 'YYYY-MM-dd');
      }
      if (filter.warehouseId != null) {
        queryString += ((queryString.length > 1) ? '&' : '') + 'WarehouseId=' + filter.warehouseId;
      }
      if (filter.name != null) {
        queryString += ((queryString.length > 1) ? '&' : '') + 'Name=' + filter.name;
      }
      if (filter.clientId != null) {
        queryString += ((queryString.length > 1) ? '&' : '') + 'ClientId=' + filter.clientId;
      }
      this.change.emit(queryString);
    } else {
      this.toastService.show('¡No hay criterio de busqueda!', 3000);
    }
  }
  clean() {
    this.form.get('name').setValue(null);
    this.form.get('warehouseId').setValue(null);
    this.form.get('dateInit').setValue(null);
    this.form.get('dateEnd').setValue(null);
    this.form.get('clientId').setValue(null);
    this.form.get('myControl').setValue(null);
    this.change.emit('');
  }

}