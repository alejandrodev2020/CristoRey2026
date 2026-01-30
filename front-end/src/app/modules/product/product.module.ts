import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ClientHighComponent } from './components/client-high/client-high.component';
import { StoreProductComponent } from './pages/product-gestionary/store-product/store-product.component';
import { ProductGestionaryComponent } from './pages/product-gestionary/product-gestionary.component';
import { ProductMovementComponent } from './pages/product-movement/product-movement.component';
import { ProductService } from './services/product.service';
import { PreviewQuestionsUnitmeasurementComponent } from './components/preview-questions-unitmeasurement/preview-questions-unitmeasurement.component';
import { OverviewProductComponent } from './components/product-aggregate/overview-product/overview-product.component';
import { FilterClientComponent } from './components/product-aggregate/filter-client/filter-client.component';
import { ProductoEquivalenceComponent } from './pages/producto-equivalence/producto-equivalence.component';
import { ItemCardComponent } from './components/producto-equivalence/item-card/item-card.component';
import { FormStoreComponent } from './components/producto-equivalence/form-store/form-store.component';
import { ProductMassiveComponent } from './pages/product-massive/product-massive.component';
import { FilterProductGestionaryComponent } from './pages/product-gestionary/filter-product-gestionary/filter-product-gestionary.component';

const routes: Routes = [
   { path: '', component: ProductGestionaryComponent},
   { path: 'product', component: ProductGestionaryComponent},
   { path: 'product/store', component: StoreProductComponent},
   { path: 'product/store/:id', component: StoreProductComponent},
   { path: 'product/equivalence/:id', component: ProductoEquivalenceComponent},
   { path: 'product/massive', component: ProductMassiveComponent},
  ];


@NgModule({
  declarations: [
    OverviewProductComponent,
    FilterClientComponent,
    ClientHighComponent,
    StoreProductComponent,
    ProductGestionaryComponent,
    ProductMovementComponent,
    PreviewQuestionsUnitmeasurementComponent,
    ProductoEquivalenceComponent,
    ItemCardComponent,
    FormStoreComponent,
    ProductMassiveComponent,
    FilterProductGestionaryComponent
  ],
  providers:[
    ProductService
  ],
  imports: [CommonModule,
     SharedModule,
     RouterModule.forChild(routes)
    ],
})
export class ProductModule {}
