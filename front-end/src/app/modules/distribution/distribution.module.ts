import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { DateFormatPipe } from 'app/shared/tools/pipe/date-format.pipe';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DistributionGestionaryComponent } from './pages/distribution-gestionary/distribution-gestionary.component';
import { DistributionHistoryComponent } from './pages/distribution-history/distribution-history.component';
import { DistributionService } from './services/distribution.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { StoreDistributionComponent } from './pages/distribution-gestionary/store-distribution/store-distribution.component';
import { DistributionExecuteComponent } from './pages/distribution-execute/distribution-execute.component';
import { DistributionRaiseOrderComponent } from './pages/distribution-raise-order/distribution-raise-order.component';
import { PreviewProductComponent } from './components/preview-product/preview-product.component';
import { PreviewOrderComponent } from './components/preview-order/preview-order.component';
import { DistributionMapsComponent } from './pages/distribution-maps/distribution-maps.component';
import { OrverviewOrderComponent } from './components/orverview-order/orverview-order.component';

const routes: Routes = [
   { path: '', component: DistributionGestionaryComponent}, 
   { path: 'home', component: DistributionGestionaryComponent}, 
   { path: 'history', component: DistributionHistoryComponent},
   { path: 'distribution/maps', component: DistributionMapsComponent},
   { path: 'distribution/store', component: StoreDistributionComponent}, 
   { path: 'distribution/store/:id', component: StoreDistributionComponent}, 
   { path: 'distribution/execute/:id', component: DistributionExecuteComponent}, 
   { path: 'distribution/raise-order/:id', component: DistributionRaiseOrderComponent}, 
  ];
  

@NgModule({
  declarations: [
    DistributionGestionaryComponent,
    DistributionHistoryComponent,
    StoreDistributionComponent,
    DistributionExecuteComponent,
    DistributionRaiseOrderComponent,
    PreviewProductComponent,
    PreviewOrderComponent,
    DistributionMapsComponent,
    OrverviewOrderComponent
  ],

  providers:[
    DistributionService,
    DateFormatPipe,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  imports: [
     CommonModule,
     SharedModule, 
     GoogleMapsModule,
     RouterModule.forChild(routes)
    ],
})
export class DistributionModule {}
