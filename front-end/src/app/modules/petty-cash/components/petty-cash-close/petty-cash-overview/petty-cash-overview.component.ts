import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientService } from 'app/modules/client/services/client.service';
import { Classifier } from 'app/modules/configuration/models/classifier';
import { PettyCashService } from 'app/modules/petty-cash/services/petty-cash.service';
import { SaleDetail } from 'app/modules/sale/models/saleDetail';
import { SaleService } from 'app/modules/sale/services/sale.service';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';
import { environment } from 'environments/enviroments';
import { map, Observable, startWith } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-petty-cash-overview',
  templateUrl: './petty-cash-overview.component.html',
  styleUrls: ['./petty-cash-overview.component.scss']
})
export class PettyCashOverviewComponent {
currentPettyCash : any;
logoClient = environment.logo;
pettyCashId : number;
  constructor(@Inject(MAT_DIALOG_DATA) data,
              private servicePettyCash : PettyCashService,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<any>){
    this.pettyCashId =  data.id;
    this.setDataDefault();
   }

  setDataDefault(){
    this.servicePettyCash.getById(this.pettyCashId).subscribe((resp) => {
        this.currentPettyCash = resp;
    })  
  }
  close(){
    this.dialogRef.close(true);
  }

}
