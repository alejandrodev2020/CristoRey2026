import { OverviewModule } from './modules/overview/overview.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

const routes: Routes =  [

  {path: '', pathMatch : 'full', redirectTo: 'auth'},
  {
    path: 'home',
    component: LayoutComponent,
    resolve: { initialData: InitialDataResolver},
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    component: LayoutComponent,
    data: {  layout: 'empty'},
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'warehouse',
    component: LayoutComponent,
    resolve: { initialData: InitialDataResolver},
    loadChildren: () =>
      import('./modules/warehouse/warehouse.module').then((m) => m.WarehouseModule),
  },
  {
    path: 'client',
    component: LayoutComponent,
    resolve: { initialData: InitialDataResolver},
    loadChildren: () =>
      import('./modules/client/client.module').then((m) => m.ClientModule),
  },
  {
    path: 'patient',
    component: LayoutComponent,
    resolve: { initialData: InitialDataResolver},
    loadChildren: () =>
      import('./modules/patient/patient.module').then((m) => m.PatientModule),
  },
  {
    path: 'calendar',
    component: LayoutComponent,
    resolve: { initialData: InitialDataResolver},
    loadChildren: () =>
      import('./modules/calendar/calendar.module').then((m) => m.CalendarModule),
  },
  {
    path: 'provider',
    component: LayoutComponent,
    resolve: { initialData: InitialDataResolver},
    loadChildren: () =>
      import('./modules/provider/provider.module').then((m) => m.ProviderModule),
  },
  {
    path: 'options',
    component: LayoutComponent,
    resolve: { initialData: InitialDataResolver},
    loadChildren: () =>
      import('./modules/options/options.module').then((m) => m.OptionsModule),
  },
  {
    path: 'doctors',
    component: LayoutComponent,
    resolve: { initialData: InitialDataResolver},
    loadChildren: () =>
      import('./modules/doctor/doctor.module').then((m) => m.DoctorModule),
  },
  {
    path: 'product',
    component: LayoutComponent,
    resolve: { initialData: InitialDataResolver},
    loadChildren: () =>
      import('./modules/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'sale',
    component: LayoutComponent,
    resolve: { initialData: InitialDataResolver},
    loadChildren: () =>
      import('./modules/sale/sale.module').then((m) => m.SaleModule),
  },
  {
    path: 'shopping',
    component: LayoutComponent,
    resolve: { initialData: InitialDataResolver},
    loadChildren: () =>
      import('./modules/shopping/shopping.module').then((m) => m.ShoppingModule),
  },
  {
    path: 'security',
    component: LayoutComponent,
    resolve: { initialData: InitialDataResolver},
    loadChildren: () =>
      import('./modules/security/security.module').then((m) => m.SecurityModule),
  },
  {
    path: 'petty-cash',
    component: LayoutComponent,
    resolve: { initialData: InitialDataResolver},
    loadChildren: () =>
      import('./modules/petty-cash/petty-cash.module').then((m) => m.PettyCashModule),
  },
  {
    path: 'configuration',
    component: LayoutComponent,
    resolve: { initialData: InitialDataResolver},
    loadChildren: () =>
      import('./modules/configuration/configuration.module').then((m) => m.ConfigurationModule),
  },
  {
    path: 'report',
    component: LayoutComponent,
    resolve: { initialData: InitialDataResolver},
    loadChildren: () =>
    import('./modules/report/report.module').then((m) => m.ReportModule),
  },
  {
    path: 'collections',
    component: LayoutComponent,
    resolve: { initialData: InitialDataResolver},
    loadChildren: () =>
      import('./modules/collections/collections.module').then((m) => m.ColletionsModule),
  },
  {
    path: 'overview',
    resolve: { initialData: InitialDataResolver},
    loadChildren: () =>
      import('./modules/overview/overview.module').then((m) => m.OverviewModule),
  },
  {
    path: 'distribution',
    component: LayoutComponent,
    resolve: { initialData: InitialDataResolver},
    loadChildren: () =>
    import('./modules/distribution/distribution.module').then((m) => m.DistributionModule),
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:false, preloadingStrategy   : PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
