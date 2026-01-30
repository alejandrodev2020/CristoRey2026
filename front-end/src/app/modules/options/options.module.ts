import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { OptionsService } from './services/options.service';
import { OptionsGestionaryComponent } from './pages/options-gestionary/options-gestionary.component';
import { StoreOptionsComponent } from './pages/options-gestionary/store-product/store-options.component';
import { DiasnosticGestionaryComponent } from './pages/diasnostic-gestionary/diasnostic-gestionary.component';
import { StoreDiasnosticComponent } from './pages/diasnostic-gestionary/store-diasnostic/store-diasnostic.component';
import { TratamentGestionaryComponent } from './pages/tratament-gestionary/tratament-gestionary.component';
import { StoreTratamentComponent } from './pages/tratament-gestionary/store-tratament/store-tratament.component';

const routes: Routes = [
  { path: '', component: OptionsGestionaryComponent },
  { path: 'store', component: StoreOptionsComponent },
  { path: 'store/:id', component: StoreOptionsComponent },

  { path: 'diasnostic/:id', component: DiasnosticGestionaryComponent },
  { path: 'tratament/:id', component: TratamentGestionaryComponent },

  { path: ':optionId/diasnostic/store', component: StoreDiasnosticComponent }, 
  { path: ':optionId/diasnostic/store/:diagnosticId', component: StoreDiasnosticComponent }, 

  { path: ':optionId/tratament/store', component: StoreTratamentComponent }, 
  { path: ':optionId/tratament/store/:tratamentId', component: StoreTratamentComponent } 

];


@NgModule({
  declarations: [
    OptionsGestionaryComponent,
    StoreOptionsComponent,
    DiasnosticGestionaryComponent,
    TratamentGestionaryComponent,
    StoreDiasnosticComponent,
    StoreTratamentComponent,

  ],
  providers:[
     OptionsService
  ],
  imports: [CommonModule,
     SharedModule,
     RouterModule.forChild(routes)
    ],
})
export class OptionsModule {}
