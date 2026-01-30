import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { PettyCashService } from 'app/modules/petty-cash/services/petty-cash.service';
import { MatDialog } from '@angular/material/dialog';

import { SaleService } from 'app/modules/sale/services/sale.service';
import { OverviewPaymentComponent } from 'app/modules/collections/components/overview-payment/overview-payment.component';
import { AddPaymentComponent } from 'app/modules/collections/components/add-payment/add-payment.component';
import { ReportService } from '../../services/report.service';


@Component({
  selector: 'app-earning-detail',
  templateUrl: './earning-detail.component.html',
  styleUrls: ['./earning-detail.component.scss']
})
export class EarningDetailComponent {


  @Input('data')
  set item1(val: any) {
      this.id = val;
      this.setEarningById();
  }


  displayedColumns: string[] = ['id', 'paymentDate', 'amount', 'balance', 'actions'];
  dataSource = [];
  currentSale: any = null;
  collectionsCurrent: any = null;
  amountTotalEarning : number = 0;
  earningDetail : any[] = [];

  id: number;
  pettyCash: any;
  pettyCashDetails: any;



  constructor(private activatedRoute: ActivatedRoute,
      private service: ReportService,
      public dialog: MatDialog) {
      this.id = parseInt(this.activatedRoute.snapshot.params['id']);
      (this.id > 0) && this.setEarningById();
  }


  setEarningById() {
      this.service.getEarningByIdReport(this.id).subscribe((resp: any) => {
        this.amountTotalEarning = resp.amountTotalEarning;
        this.earningDetail = resp.details;
        if (Array.isArray(this.earningDetail)) {
          this.earningDetail.sort((a, b) => {
            if (a.product && b.product) {
              return b.product.id - a.product.id; 
            }
            return 0; 
          });
        }
        this.getSaleById(resp?.saleId);
      });

  }

  viewEarning(){
    
  }

  overView() {
      const dialogRef = this.dialog.open(OverviewPaymentComponent, {
          panelClass: 'custom-container',
          maxHeight: '94vh',
          data: this.collectionsCurrent,
      });

      dialogRef.afterClosed().subscribe(result => {
        //   this.setDataPettyCash();
      });
  }

  getSaleById(saleId : number){
      this.service.getById(saleId).subscribe((resp : any)=>{
          this.currentSale = resp;
          
          // Verifica si currentSale.details existe y es un array
          if (Array.isArray(this.currentSale.details)) {
            // Ordena el array 'details' por el id de la propiedad 'product' de mayor a menor
            this.currentSale.details.sort((a, b) => {
              // Asegura que a.product y b.product existan antes de acceder a su id
              if (a.product && b.product) {
                return b.product.id - a.product.id;
              }
              return 0; // Si alguno no tiene 'product', no cambia el orden
            });
          }

      
      });
  }

  addPayment() {
      const dialogRef = this.dialog.open(AddPaymentComponent, {
          panelClass: 'custom-container',
          maxHeight: '94vh',
          data: this.collectionsCurrent,
      });

      dialogRef.afterClosed().subscribe(result => {
        //   this.setDataPettyCash();
      });
  }

}

