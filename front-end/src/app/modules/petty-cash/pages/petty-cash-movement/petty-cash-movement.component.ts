import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PettyCashService } from '../../services/petty-cash.service';
import {MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { OverviewSaleComponent } from 'app/modules/sale/components/overview-sale/overview-sale.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'petty-cash-movement',
  templateUrl: './petty-cash-movement.component.html',
  styleUrls: ['./petty-cash-movement.component.scss']
})
export class PettyCashMovementComponent {


  @Input('data')
  set item1(val: any) {
    this.id = val;
    this.setDataPettyCash();
  }


  displayedColumns: string[] = ['id', 'movementDate', 'amount', 'type', 'status','actions'];
  dataSource =  [];

id : number ;
pettyCash : any ;
pettyCashDetails : any;
  constructor(private activatedRoute: ActivatedRoute,
              private service : PettyCashService,
              public dialog: MatDialog)
  {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    (this.id > 0)&& this.setDataPettyCash();
  }


  setDataPettyCash(){
    
   this.service.getById(this.id).subscribe((resp)=>{
      this.pettyCash = resp;
   });

   this.service.getMovementsById(this.id).subscribe((resp:any[])=>{
     this.dataSource = resp;
   })
  }

  overView(data:any){

    if(data.movementOriginId === 1 || data.movementOriginId === 2 || data.movementOriginId === 7){
        const dialogRef = this.dialog.open(OverviewSaleComponent, {
            panelClass: 'custom-container',
            maxHeight: '94vh',

            data: { id: data.saleId },
          });

          dialogRef.afterClosed().subscribe(result => {
            let tes = result;
          });
    }
  }

  downloadPDFTermic(){
    this.service.getReportExcelPettyCashById(this.id).subscribe(
      (response: Blob) => {
          const fileURL = URL.createObjectURL(response);
          window.open(fileURL, '_blank');
          setTimeout(() => {
              URL.revokeObjectURL(fileURL);
          }, 100);
      },
      err => {
          console.error('Error al descargar el Excel:', err);
   });
  }

  exportPdf(){
    this.service.getReportPettyCashById(this.id).subscribe(
        (response: Blob) => {
            const fileURL = URL.createObjectURL(response);
            window.open(fileURL, '_blank');
            setTimeout(() => {
                URL.revokeObjectURL(fileURL);
            }, 100);
        },
        err => {
            console.error('Error al descargar el PDF:', err);
    });
  }

}

