import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewFindSaleComponent } from './pages/overview-find-sale/overview-find-sale.component';
import { OverviewListSaleComponent } from './pages/overview-list-sale/overview-list-sale.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

const routes: Routes = [
    { path: '', component: OverviewFindSaleComponent},
    { path: 'sale', component: OverviewFindSaleComponent},
    { path: 'sale/:id', component: OverviewFindSaleComponent}
   ];


@NgModule({
  declarations: [
    OverviewFindSaleComponent,
    OverviewListSaleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class OverviewModule { }
