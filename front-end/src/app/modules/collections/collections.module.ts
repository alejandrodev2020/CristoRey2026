import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CollectionsService } from './services/collections.service';
import { CollectionsGestionaryComponent } from './pages/collections-gestionary/collections-gestionary.component';
import { CollectionsMovementsComponent } from './pages/collections-movements/collections-movements.component';
import { StoreCollectionsComponent } from './pages/collections-gestionary/store-collections/store-collections.component';
import { OverviewCollectionsComponent } from './components/overview-collections/overview-collections.component';
import { CollectionsDetailComponent } from './pages/collections-detail/collections-detail.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { FilterCollectionGestionaryComponent } from './pages/collections-gestionary/filter-collection-gestionary/filter-collection-gestionary.component';
import { OverviewPaymentComponent } from './components/overview-payment/overview-payment.component';

const routes: Routes = [
   { path: '', component: CollectionsGestionaryComponent}, 
   { path: 'collections', component: CollectionsGestionaryComponent},
   { path: 'collections/store', component: StoreCollectionsComponent}, 
   { path: 'collections/store/:id', component: StoreCollectionsComponent}, 
   { path: 'collections/detail/:id', component: CollectionsDetailComponent}, 
  ];
  

@NgModule({
  declarations: [
    CollectionsGestionaryComponent,
    CollectionsMovementsComponent,
    StoreCollectionsComponent,
    OverviewCollectionsComponent,
    CollectionsDetailComponent,
    AddPaymentComponent,
    FilterCollectionGestionaryComponent,
    OverviewPaymentComponent
  ],
  providers:[
    CollectionsService
  ],
  imports: [
     CommonModule,
     SharedModule, 
     RouterModule.forChild(routes)
    ],
})
export class ColletionsModule {}
