import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { OverviewClientComponent } from './components/client-aggregate/overview-client/overview-client.component';
import { FilterClientComponent } from './components/client-aggregate/filter-client/filter-client.component';
import { ClientHighComponent } from './components/client-high/client-high.component';
import { SalesMovementComponent } from './pages/sales-movement/sales-movement.component';
import { PreviewProductComponent } from './components/shopping-store/preview-product/preview-product.component';
import { ShoppingService } from './services/shopping.service';
import { ShoppingGestionaryComponent } from './pages/shopping-gestionary/shopping-gestionary.component';
import { StoreShoppingComponent } from './pages/shopping-gestionary/store-shopping/store-shopping.component';
import { PreviewProductShoppingComponent } from './components/shopping-store/preview-product-shopping/preview-product-shopping.component';
import { PreviewShoppingComponent } from './components/shopping-store/preview-shopping/preview-shopping.component';
import { OverviewShoppingComponent } from './components/overview-shopping/overview-shopping.component';
import { FilterShoppingGestionaryComponent } from './pages/shopping-gestionary/filter-shopping-gestionary/filter-shopping-gestionary.component';

const routes: Routes = [
   { path: '', component: ShoppingGestionaryComponent}, 
   { path: 'shopping', component: ShoppingGestionaryComponent},
   { path: 'shopping/store', component: StoreShoppingComponent}, 
   { path: 'shopping/store/:id', component: StoreShoppingComponent}, 
  ];
  

@NgModule({
  declarations: [
    OverviewClientComponent,
    FilterClientComponent,
    ClientHighComponent,
    ShoppingGestionaryComponent,
    StoreShoppingComponent,
    SalesMovementComponent,
    PreviewProductComponent,
    PreviewProductShoppingComponent,
    PreviewShoppingComponent,
    OverviewShoppingComponent,
    FilterShoppingGestionaryComponent
  ],
  providers:[
    ShoppingService
  ],
  imports: [
     CommonModule,
     SharedModule, 
     RouterModule.forChild(routes)
    ],
})
export class ShoppingModule {}
