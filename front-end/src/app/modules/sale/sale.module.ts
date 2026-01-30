import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { SaleService } from './services/sale.service';
import { SalesGestionaryComponent } from './pages/sales-gestionary/sales-gestionary.component';
import { StoreSaleComponent } from './pages/sales-gestionary/store-sale/store-sale.component';
import { SalesMovementComponent } from './pages/sales-movement/sales-movement.component';
import { PreviewProductComponent } from './components/sale-store/preview-product/preview-product.component';
import { PreviewSaleComponent } from './components/sale-store/preview-sale/preview-sale.component';
import { SelectWarehouseComponent } from './components/sale-store/select-warehouse/select-warehouse.component';
import { OverviewSaleComponent } from './components/overview-sale/overview-sale.component';
import { SaleCreditStoreComponent } from './components/sale-store/sale-credit-store/sale-credit-store.component';
import { OverviewQrCodeComponent } from './components/overview-qr-code/overview-qr-code.component';
import { DateFormatPipe } from 'app/shared/tools/pipe/date-format.pipe';
import { PreviewSaleWhatsappComponent } from './components/preview-sale-whatsapp/preview-sale-whatsapp.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SaleFilterComponent } from './components/sale-filter/sale-filter.component';
import { FormMixPaymentComponent } from './components/sale-store/form-mix-payment/form-mix-payment.component';

const routes: Routes = [
   { path: '', component: SalesGestionaryComponent}, 
   { path: 'acept', component: SalesGestionaryComponent},
  //  { path: 'sale/store', component: StoreSaleComponent}, 
  //  { path: 'sale/store/:id', component: StoreSaleComponent}, 
  ];
  

@NgModule({
  declarations: [
    SalesGestionaryComponent,
    StoreSaleComponent,
    SalesMovementComponent,
    PreviewProductComponent,
    PreviewSaleComponent,
    SelectWarehouseComponent,
    OverviewSaleComponent,
    SaleCreditStoreComponent,
    OverviewQrCodeComponent,
    PreviewSaleWhatsappComponent,
    SaleFilterComponent,
    FormMixPaymentComponent,

  ],
  providers:[
    SaleService,DateFormatPipe,
    { provide: MAT_DIALOG_DATA, useValue: {} },
     { provide: MatDialogRef, useValue: {} }
  ],
  imports: [
     CommonModule,
     SharedModule, 
     RouterModule.forChild(routes)
    ],
})
export class SaleModule {}
