import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { GoogleMapsModule } from '@angular/google-maps';
import { PatientService } from './services/patient.service';
import { PatientGestionaryComponent } from './pages/patient-gestionary/patient-gestionary.component';
import { ClinicHistoryComponent } from './pages/clinic-history/clinic-history.component';
import { StorePatientComponent } from './pages/patient-gestionary/store-patient/store-patient.component';
import { FilterPatientGestionaryComponent } from './pages/patient-gestionary/filter-patient-gestionary/filter-patient-gestionary.component';

const routes: Routes = [
   { path: '', component: PatientGestionaryComponent}, 
   { path: 'patient', component: PatientGestionaryComponent}, 
   { path: 'patient/history/:id', component: ClinicHistoryComponent}, 
   { path: 'patient/store', component: StorePatientComponent}, 
   { path: 'patient/store/:id', component: StorePatientComponent}, 
  ];
  

@NgModule({
  declarations: [
    PatientGestionaryComponent,
    ClinicHistoryComponent,
    StorePatientComponent,
    FilterPatientGestionaryComponent
  ],
  providers:[
    PatientService
  ],
  imports: [CommonModule,
     SharedModule, 
     MatDialogModule,
     GoogleMapsModule,
     RouterModule.forChild(routes)
    ],
})
export class PatientModule {}
