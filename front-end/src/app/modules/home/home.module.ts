import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DefaultPageComponent } from './pages/default-page/default-page.component';
import { SharedModule } from 'app/shared/shared.module';
import { SettingsModule } from 'app/layout/common/settings/settings.module';
import { GoogleMapsModule } from '@angular/google-maps';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'home', component: HomePageComponent},
  { path: 'default', component: DefaultPageComponent},
  ];


@NgModule({
  declarations: [HomePageComponent, DefaultPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    SettingsModule,
    GoogleMapsModule,
    RouterModule.forChild(routes)],
})
export class HomeModule {}
