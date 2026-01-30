import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { SaleThermalUnitComponent } from './components/sale-module/sale-thermal-unit/sale-thermal-unit.component';
import { SaleLetterUnitComponent } from './components/sale-module/sale-letter-unit/sale-letter-unit.component';
import { SaleLetterListComponent } from './components/sale-module/sale-letter-list/sale-letter-list.component';
import { SaleThermalListComponent } from './components/sale-module/sale-thermal-list/sale-thermal-list.component';
import { FuseSplashScreenModule } from '@fuse/services/splash-screen';
// import { QRCodeModule } from 'angularx-qrcode';
import { HomeReportComponent } from './pages/home-report/home-report.component';
import { SaleReportComponent } from './pages/sale-report/sale-report.component';
import { ClientReportComponent } from './pages/client-report/client-report.component';
import { ShoppingReportComponent } from './pages/shopping-report/shopping-report.component';
import { WarehouseReportComponent } from './pages/warehouse-report/warehouse-report.component';
import { CollectionsReportComponent } from './pages/collections-report/collections-report.component';
import { SaleFilterReportComponent } from './components/sale-module/sale-filter-report/sale-filter-report.component';
import { ReportService } from './services/report.service';
import { SalePreviewQrComponent } from './components/sale-module/sale-preview-qr/sale-preview-qr.component';
import { EarningReportComponent } from './pages/earning-report/earning-report.component';
import { ProductReportComponent } from './pages/product-report/product-report.component';
import { PettyCashReportComponent } from './pages/petty-cash-report/petty-cash-report.component';
import { EarningDetailComponent } from './pages/earning-detail/earning-detail.component';
import { EarningFilterReportComponent } from './components/earning-module/earning-filter-report/earning-filter-report.component';
import { EarningItemDetailReportComponent } from './components/earning-module/earning-item-detail-report/earning-item-detail-report.component';
import { ShoppingFilterReportComponent } from './components/shopping-module/shopping-filter-report/shopping-filter-report.component';



const routes: Routes = [
   { path: '', component: HomeReportComponent},
   { path: 'home', component: HomeReportComponent},
   { path: 'acept', component: SaleReportComponent},
   { path: 'shopping', component: ShoppingReportComponent},
   { path: 'earning', component: EarningReportComponent},
   { path: 'warehouse-inventory', component: WarehouseReportComponent},
   { path: 'client', component: ClientReportComponent},
   { path: 'preview-termic-unit/:id', component: SaleThermalUnitComponent},
   { path: 'preview-letter-unit/:id', component: SaleLetterUnitComponent},
   { path: 'sale/preview-termic-list', component: SaleThermalListComponent},
   { path: 'sale/preview-qr/:id', component: SalePreviewQrComponent},
   { path: 'earning/detail/:id', component: EarningDetailComponent},
  ];


@NgModule({
  declarations: [
    SaleThermalUnitComponent,
    SaleLetterUnitComponent,
    SaleLetterListComponent,
    SaleThermalListComponent,
    HomeReportComponent,
    SaleReportComponent,
    ClientReportComponent,
    ShoppingReportComponent,
    WarehouseReportComponent,
    CollectionsReportComponent,
    SaleFilterReportComponent,
    SalePreviewQrComponent,
    EarningReportComponent,
    ProductReportComponent,
    PettyCashReportComponent,
    EarningDetailComponent,
    EarningFilterReportComponent,
    EarningItemDetailReportComponent,
    ShoppingFilterReportComponent
  ],
  providers:[
    ReportService
  ],
  imports: [
    //  QRCodeModule,
     CommonModule,
     SharedModule,

     FuseSplashScreenModule,
     RouterModule.forChild(routes)
    ],
})
export class ReportModule {}
