import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { HomeConfigurationComponent } from './pages/home-configuration/home-configuration.component';
import { UnitMeasurementComponent } from './pages/unit-measurement/unit-measurement.component';
import { ProductCategoryComponent } from './pages/product-category/product-category.component';
import { ConfigurationService } from './services/configuration.service';
import { StoreClassifierComponent } from './components/store-classifier/store-classifier.component';
import { WhatsAppComponent } from './pages/whats-app/whats-app.component';
import { PaymentMethodComponent } from './pages/payment-method/payment-method.component';

const routes: Routes = [
   { path: '', component: HomeConfigurationComponent}, 
   { path: 'home', component: HomeConfigurationComponent},
   { path: 'unit-measurement', component: UnitMeasurementComponent},
   { path: 'category', component: ProductCategoryComponent},
   { path: 'whats-app', component: WhatsAppComponent},
   { path: 'payment-method', component: PaymentMethodComponent},
  ];
  

@NgModule({
  declarations: [
    HomeConfigurationComponent,
    UnitMeasurementComponent,
    ProductCategoryComponent,
    StoreClassifierComponent,
    WhatsAppComponent,
    PaymentMethodComponent
  ],
  providers:[
    ConfigurationService
  ],
  imports: [CommonModule,
     SharedModule, 
     RouterModule.forChild(routes)
    ],
})
export class ConfigurationModule {}
