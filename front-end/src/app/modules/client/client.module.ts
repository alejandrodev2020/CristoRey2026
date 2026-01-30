import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ClientGestionaryComponent } from './pages/client-gestionary/client-gestionary.component';
import { StoreClientComponent } from './pages/client-gestionary/store-client/store-client.component';
import { HistorySaleComponent } from './pages/history-sale/history-sale.component';
import { ClientService } from './services/client.service';
import { OverviewClientComponent } from './components/client-aggregate/overview-client/overview-client.component';
import { FilterClientComponent } from './components/client-aggregate/filter-client/filter-client.component';
import { ClientHighComponent } from './components/client-high/client-high.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterClientGestionaryComponent } from './pages/client-gestionary/filter-client-gestionary/filter-client-gestionary.component';
import { GoogleMapsModule } from '@angular/google-maps';

const routes: Routes = [
   { path: '', component: ClientGestionaryComponent}, 
   { path: 'client', component: ClientGestionaryComponent}, 
   { path: 'client/history/:id', component: HistorySaleComponent}, 
   { path: 'client/store', component: StoreClientComponent}, 
   { path: 'client/store/:id', component: StoreClientComponent}, 
  ];
  

@NgModule({
  declarations: [
    ClientGestionaryComponent,
    StoreClientComponent,
    HistorySaleComponent,
    OverviewClientComponent,
    FilterClientComponent,
    ClientHighComponent,
    FilterClientGestionaryComponent
  ],
  providers:[
    ClientService
  ],
  imports: [CommonModule,
     SharedModule, 
     MatDialogModule,
     GoogleMapsModule,
     RouterModule.forChild(routes)
    ],
})
export class ClientModule {}
