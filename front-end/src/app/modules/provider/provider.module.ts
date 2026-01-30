import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { HistorySaleComponent } from './pages/history-sale/history-sale.component';
import { FilterClientComponent } from './components/client-aggregate/filter-client/filter-client.component';
import { ClientHighComponent } from './components/client-high/client-high.component';
import { ProviderService } from './services/provider.service';
import { ProviderGestionaryComponent } from './pages/provider-gestionary/provider-gestionary.component';
import { StoreProviderComponent } from './pages/provider-gestionary/store-provider/store-provider.component';
import { OverviewProviderComponent } from './components/client-aggregate/overview-provider/overview-provider.component';
import { FilterProviderGestionaryComponent } from './pages/provider-gestionary/filter-provider-gestionary/filter-provider-gestionary.component';

const routes: Routes = [
   { path: '', component: ProviderGestionaryComponent}, 
   { path: 'provider', component: ProviderGestionaryComponent}, 
   { path: 'client/history/:id', component: HistorySaleComponent}, 
   { path: 'provider/store', component: StoreProviderComponent}, 
   { path: 'provider/store/:id', component: StoreProviderComponent}, 
  ];
  

@NgModule({
  declarations: [
    ProviderGestionaryComponent,
    StoreProviderComponent,
    HistorySaleComponent,
    OverviewProviderComponent,
    FilterClientComponent,
    ClientHighComponent,
    FilterProviderGestionaryComponent
  ],
  providers:[
    ProviderService
  ],
  imports: [CommonModule,
     SharedModule, 
     RouterModule.forChild(routes)
    ],
})
export class ProviderModule {}
