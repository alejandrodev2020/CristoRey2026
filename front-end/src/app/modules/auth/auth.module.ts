import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
// import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';


import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { UserGetionaryComponent } from './pages/user-getionary/user-getionary.component';
import { StoreUserComponent } from './pages/user-getionary/store-user/store-user.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login',    component: LoginComponent,   },  
  { path: 'profile',    component: ProfileComponent, },  
  { path: 'configuration',    component: ConfigurationComponent, },  
  ];
  

@NgModule({
  declarations: [
     LoginComponent, 
     UserGetionaryComponent, 
     StoreUserComponent,
     ProfileComponent,
     ConfigurationComponent
  ],

  imports: [
    FormsModule,
    CommonModule,  
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FuseCardModule,
    FuseAlertModule,
    SharedModule,
    RouterModule.forChild(routes)],
  
})
export class AuthModule {}
