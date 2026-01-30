import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { PettyCashService } from 'app/modules/petty-cash/services/petty-cash.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPaymentComponent } from '../../components/add-payment/add-payment.component';
import { SaleService } from 'app/modules/sale/services/sale.service';
import { OverviewPaymentComponent } from '../../components/overview-payment/overview-payment.component';

@Component({
    selector: 'app-collections-detail',
    templateUrl: './collections-detail.component.html',
    styleUrls: ['./collections-detail.component.scss']
})
export class CollectionsDetailComponent {


    @Input('data')
    set item1(val: any) {
        this.id = val;
        this.setDataPettyCash();
    }


    displayedColumns: string[] = ['id', 'paymentDate', 'amount', 'balance', 'actions'];
    dataSource = [];
    currentSale: any = null;
    collectionsCurrent: any = null;

    id: number;
    pettyCash: any;
    pettyCashDetails: any;
    constructor(private activatedRoute: ActivatedRoute,
        private service: SaleService,
        public dialog: MatDialog) {
        this.id = parseInt(this.activatedRoute.snapshot.params['id']);
        (this.id > 0) && this.setDataPettyCash();
    }


    setDataPettyCash() {
        this.service.getSaleCreditById(this.id).subscribe((resp) => {
            this.collectionsCurrent = resp;
            this.pettyCash = resp;
            this.dataSource = resp.detailPayment;
            this.getSaleById(resp.sale.id);
        });

    }

    overView() {
        const dialogRef = this.dialog.open(OverviewPaymentComponent, {
            panelClass: 'custom-container',
            maxHeight: '94vh',
            data: this.collectionsCurrent,
        });

        dialogRef.afterClosed().subscribe(result => {
            this.setDataPettyCash();
        });
    }

    getSaleById(saleId : number){
        this.service.getById(saleId).subscribe((resp : any)=>{
            this.currentSale = resp;
        });
    }

    getReceiptByPaymentId(id : number){
    }

    addPayment() {
        const dialogRef = this.dialog.open(AddPaymentComponent, {
            panelClass: 'custom-container',
            maxHeight: '94vh',
            data: this.collectionsCurrent,
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result > 0){
                this.getReceiptByPaymentId(result);
            }
            this.setDataPettyCash();
        });
    }

}

