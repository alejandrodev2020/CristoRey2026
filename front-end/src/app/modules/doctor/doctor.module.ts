import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { HistorySaleComponent } from './pages/history-sale/history-sale.component';
import { FilterClientComponent } from './components/client-aggregate/filter-client/filter-client.component';
import { ClientHighComponent } from './components/client-high/client-high.component';
import { DoctorsGestionaryComponent } from './pages/doctors-gestionary/doctors-gestionary.component';
import { StoreDoctorsComponent } from './pages/doctors-gestionary/store-doctors/store-doctors.component';
import { OverviewProviderComponent } from './components/client-aggregate/overview-provider/overview-provider.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { DoctorService } from './services/doctor.service';

const routes: Routes = [
   { path: '', component: DoctorsGestionaryComponent}, 
   { path: 'doctors', component: DoctorsGestionaryComponent}, 
   { path: 'client/history/:id', component: HistorySaleComponent}, 
   { path: 'doctors/store', component: StoreDoctorsComponent}, 
   { path: 'doctors/store/:id', component: StoreDoctorsComponent}, 
  ];
  

@NgModule({
  declarations: [
    DoctorsGestionaryComponent,
    StoreDoctorsComponent,
    HistorySaleComponent,
    OverviewProviderComponent,
    FilterClientComponent,
    ClientHighComponent,
    // FilterDoctorsGestionaryComponent
  ],
  providers:[
    DoctorService
  ],
  imports: [CommonModule,
     SharedModule, 
      GoogleMapsModule,
     RouterModule.forChild(routes)
    ],
})
export class DoctorModule {}
