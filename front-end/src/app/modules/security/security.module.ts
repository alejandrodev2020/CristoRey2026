import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { HistorySaleComponent } from './pages/history-sale/history-sale.component';
import { FilterClientComponent } from './components/client-aggregate/filter-client/filter-client.component';
import { ClientHighComponent } from './components/client-high/client-high.component';
import { OverviewProviderComponent } from './components/client-aggregate/overview-provider/overview-provider.component';
import { SecurityService } from './services/security.service';
import { UserGestionaryComponent } from './pages/user-gestionary/user-gestionary.component';
import { StoreUserComponent } from './pages/user-gestionary/store-user/store-user.component';
import { HomeSecurityComponent } from './pages/home-security/home-security.component';
import { OverviewUserComponent } from './components/user-components/overview-user/overview-user.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsAccountComponent } from './components/account/account.component';
import { SettingsSecurityComponent } from './components/security/security.component';
import { SettingsPlanBillingComponent } from './components/plan-billing/plan-billing.component';
import { SettingsNotificationsComponent } from './components/notifications/notifications.component';
import { SettingsTeamComponent } from './components/team/team.component';
import { UserConfigurationComponent } from './pages/user-configuration/user-configuration.component';

const routes: Routes = [
   { path: '', component: HomeSecurityComponent}, 
   { path: 'user', component: UserGestionaryComponent}, 
   { path: 'user/history/:id', component: HistorySaleComponent}, 
   { path: 'user/store', component: StoreUserComponent}, 
   { path: 'user/store/:id', component: StoreUserComponent}, 
   { path: 'profile', component: ProfileComponent}, 
   { path: 'configuration', component: UserConfigurationComponent}, 
  ];
  

@NgModule({
  declarations: [
    UserGestionaryComponent,
    StoreUserComponent,
    HistorySaleComponent,
    OverviewProviderComponent,
    FilterClientComponent,
    ClientHighComponent,
    HomeSecurityComponent,
    OverviewUserComponent,
    ProfileComponent,
    SettingsAccountComponent,
    SettingsSecurityComponent,
    SettingsPlanBillingComponent,
    SettingsNotificationsComponent,
    SettingsTeamComponent,
    UserConfigurationComponent
  ],
  providers:[
    SecurityService
  ],
  imports: [CommonModule,
     SharedModule, 
     RouterModule.forChild(routes)
    ],
})
export class SecurityModule {}
