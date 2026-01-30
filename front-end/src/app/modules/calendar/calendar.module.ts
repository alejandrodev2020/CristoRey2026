import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule,registerLocaleData  } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { GoogleMapsModule } from '@angular/google-maps';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { GestionaryCalendarComponent } from './pages/gestionary-calendar/gestionary-calendar.component';
import { ManageCalendarComponent } from './pages/manage-calendar/manage-calendar.component';
import { CalendarService } from './services/calendar.service';
import * as esLocale from 'date-fns/locale/es';
import localeEs from '@angular/common/locales/es';
import { PreviewConfirmationComponent } from './components/preview-confirmation/preview-confirmation.component';
import { PreviewAppointmentComponent } from './components/preview-appointment/preview-appointment.component';

const routes: Routes = [
  { path: '', component: GestionaryCalendarComponent },
  { path: 'gestionary', component: GestionaryCalendarComponent },
  { path: 'manage', component: ManageCalendarComponent },
];

registerLocaleData(localeEs);
@NgModule({
  declarations: [
    GestionaryCalendarComponent,
    ManageCalendarComponent,
    PreviewConfirmationComponent,
    PreviewAppointmentComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatDialogModule,
    GoogleMapsModule,

    // 🔥 Importante: angular-calendar
    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  providers: [
    CalendarService,
    { provide: LOCALE_ID, useValue: 'es' } 
  ]
})
export class CalendarModule {}
