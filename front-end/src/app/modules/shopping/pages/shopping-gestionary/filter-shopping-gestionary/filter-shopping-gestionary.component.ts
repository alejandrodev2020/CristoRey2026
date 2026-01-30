import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { ClientService } from 'app/modules/client/services/client.service';
import { Classifier } from 'app/modules/configuration/models/classifier';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';
import { DateFormatPipe } from 'app/shared/tools/pipe/date-format.pipe';
import { ToastService } from 'app/shared/services/toast.service';
import { Observable} from 'rxjs';
import { SaleService } from 'app/modules/sale/services/sale.service';


@Component({
  selector: 'filter-shopping-gestionary',
  templateUrl: './filter-shopping-gestionary.component.html',
  styleUrls: ['./filter-shopping-gestionary.component.scss']
})
export class FilterShoppingGestionaryComponent {
  listWarehouse: Classifier[] = [];
  listProvider: Classifier[] = [];
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
     this.setListProvider();
    this.form = this.fb.group({
      amount: [null],
      warehouseId: [null],
      providerId: [null],
      dateInit: [null],
      dateEnd: [null],
    });

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

  setListProvider() {
    this.serviceWarehouse.getAllProvider().subscribe((response: Classifier[]) => {
      this.listProvider = response;
    });
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
      if (filter.providerId != null) {
        queryString += ((queryString.length > 1) ? '&' : '') + 'ProviderId=' + filter.providerId;
      }
      if (filter.amount != null) {
        queryString += ((queryString.length > 1) ? '&' : '') + 'Amount=' + filter.amount;
      }

      this.change.emit(queryString);
    } else {
      this.toastService.show('¡No hay criterio de busqueda!', 3000);
    }
  }
  clean() {
    this.form.get('warehouseId').setValue(null);
    this.form.get('amount').setValue(null);
    this.form.get('providerId').setValue(null);
    this.form.get('dateInit').setValue(null);
    this.form.get('dateEnd').setValue(null);
    this.change.emit('');
  }
}
