import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { OverviewClientComponent } from './components/client-aggregate/overview-client/overview-client.component';
import { FilterClientComponent } from './components/client-aggregate/filter-client/filter-client.component';
import { ClientHighComponent } from './components/client-high/client-high.component';
import { PettyCashGestionaryComponent } from './pages/petty-cash-gestionary/petty-cash-gestionary.component';
import { StorePettyCashComponent } from './pages/petty-cash-gestionary/store-petty-cash/store-petty-cash.component';
import { PettyCashService } from './services/petty-cash.service';
import { OverviewPettyCashComponent } from './components/petty-cash-aggregate/overview-petty-cash/overview-petty-cash.component';
import { DetailPettyCashComponent } from './components/petty-cash-aggregate/detail-petty-cash/detail-petty-cash.component';
import { CloseSellerComponent } from './components/petty-cash-close/close-seller/close-seller.component';
import { CloseAdminComponent } from './components/petty-cash-close/close-admin/close-admin.component';
import { PettyCashOverviewComponent } from './components/petty-cash-close/petty-cash-overview/petty-cash-overview.component';
import { PettyCashMovementComponent } from './pages/petty-cash-movement/petty-cash-movement.component';
import { FilterPettyCashGestionaryComponent } from './pages/petty-cash-gestionary/filter-petty-cash-gestionary/filter-petty-cash-gestionary.component';
import { PettyCashManageComponent } from './pages/petty-cash-manage/petty-cash-manage.component';
import { AddOperatorsComponent } from './components/add-operators/add-operators.component';


const routes: Routes = [
   { path: '', component: PettyCashGestionaryComponent}, 
   { path: 'petty-cash', component: PettyCashGestionaryComponent},
   { path: 'petty-cash/store', component: StorePettyCashComponent}, 
   { path: 'petty-cash/store/:id', component: StorePettyCashComponent}, 
   { path: 'petty-cash/:id/movement', component: PettyCashMovementComponent}, 
   { path: 'petty-cash/manage/:id', component: PettyCashManageComponent}, 
  ];
  

@NgModule({
  declarations: [
    OverviewClientComponent,
    FilterClientComponent,
    ClientHighComponent,
    PettyCashGestionaryComponent,
    StorePettyCashComponent,
    OverviewPettyCashComponent,
    DetailPettyCashComponent,
    CloseSellerComponent,
    CloseAdminComponent,
    PettyCashOverviewComponent,
    PettyCashMovementComponent,
    FilterPettyCashGestionaryComponent,
    PettyCashManageComponent,
    AddOperatorsComponent,
    
  ],
  providers:[
    PettyCashService
  ],
  imports: [CommonModule,
     SharedModule, 
     RouterModule.forChild(routes)
    ],
})
export class PettyCashModule {}
