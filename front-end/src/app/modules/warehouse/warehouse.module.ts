import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { WarehouseGestionaryComponent } from './pages/warehouse-gestionary/warehouse-gestionary.component';
import { ItemGestionaryComponent } from './pages/item-gestionary/item-gestionary.component';
import { WarehouseService } from './services/warehouse.service';
import { StoreWarehouseComponent } from './pages/warehouse-gestionary/store-warehouse/store-warehouse.component';
import { FilterWarehouseComponent } from './components/warehouse-aggregate/filter-warehouse/filter-warehouse.component';
import { OverviewWarehouseComponent } from './components/warehouse-aggregate/overview-warehouse/overview-warehouse.component';
import { FilterItemComponent } from './components/item-aggregate/filter-item/filter-item.component';
import { OverviewItemComponent } from './components/item-aggregate/overview-item/overview-item.component';
import { StoreItemComponent } from './pages/item-gestionary/store-item/store-item.component';
import { FormMovementOnlyItemComponent } from './components/warehouse-movement/form-movement-only-item/form-movement-only-item.component';
import { OverviewMovementComponent } from './components/warehouse-movement/overview-movement/overview-movement.component';
import { WarehouseTransferComponent } from './pages/warehouse-transfer/warehouse-transfer.component';
import { WarehouseMovementComponent } from './pages/warehouse-movement/warehouse-movement.component';
import { MovementFilterComponent } from './components/warehouse-movement/movement-filter/movement-filter.component';
import { FilterWarehouseGestionaryComponent } from './pages/warehouse-gestionary/filter-warehouse-gestionary/filter-warehouse-gestionary.component';
import { WarehouseProductReportComponent } from './pages/warehouse-product-report/warehouse-product-report.component';
import { WarehouseProductReportFilterComponent } from './pages/warehouse-product-report/warehouse-product-report-filter/warehouse-product-report-filter.component';
import { WarehouseAdjustmentsComponent } from './pages/warehouse-adjustments/warehouse-adjustments.component';

const routes: Routes = [
  { path: '', component: WarehouseGestionaryComponent},
  { path: 'warehouse', component: WarehouseGestionaryComponent},
  { path: 'warehouse/store/:id', component: StoreWarehouseComponent},
  { path: 'warehouse/store', component: StoreWarehouseComponent},
  { path: 'warehouse/product/:id', component: ItemGestionaryComponent},
  { path: 'warehouse/warehouse-product-report/:id', component: WarehouseProductReportComponent},
  { path: 'warehouse/transfer/:id', component: WarehouseTransferComponent},
  { path: 'warehouse/:id/movement', component: WarehouseMovementComponent},
  { path: 'warehouse/:id/warehouse-adjustments', component: WarehouseAdjustmentsComponent},
];


@NgModule({
  declarations: [
    WarehouseGestionaryComponent,
    ItemGestionaryComponent,
    StoreWarehouseComponent,
    FilterWarehouseComponent,
    OverviewWarehouseComponent,
    FilterItemComponent,
    OverviewItemComponent,
    StoreItemComponent,
    FormMovementOnlyItemComponent,
    OverviewMovementComponent,
    WarehouseTransferComponent,
    WarehouseMovementComponent,
    MovementFilterComponent,
    FilterWarehouseGestionaryComponent,
    WarehouseProductReportComponent,
    WarehouseProductReportFilterComponent,
    WarehouseAdjustmentsComponent,
  ],
  providers:[WarehouseService],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
})
export class WarehouseModule { }
