import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { CalendarService } from '../../services/calendar.service';
import { addWeeks, subWeeks } from 'date-fns';
import { MatDialog } from '@angular/material/dialog';
import { PreviewConfirmationComponent } from '../../components/preview-confirmation/preview-confirmation.component';

@Component({
  selector: 'app-gestionary-calendar',
  templateUrl: './gestionary-calendar.component.html',
  styleUrls: ['./gestionary-calendar.component.scss']
})
export class GestionaryCalendarComponent implements OnInit {

  listAppoint: any[] = [];
  events: CalendarEvent[] = [];
  viewDate: Date = new Date();

  constructor(private service: CalendarService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    let user = localStorage.getItem('userLogged');
    let userJson = JSON.parse(user);
    this.getListAppoint(userJson?.id);
  }

  getListAppoint(id: number) {
    this.service.getListAppoint(id).subscribe({
      next: (resp: any[]) => {
        this.listAppoint = resp;
        this.events = this.mapAppointmentsToEvents(resp);  // 👈 Convertimos a eventos
      },
      error: (err) => {
        console.error('Error al obtener citas:', err);
      }
    });
  }

  mapAppointmentsToEvents(appointments: any[]): CalendarEvent[] {
    return appointments.map(app => {
      const start = new Date(app.dateQuery);
      return {
        start: start,
        end: new Date(start.getTime() + 60 * 60 * 1000), // duración 1 hora
        title: this.buildTitle(app),
        color: this.getColorByStatus(app.statusId), 
        meta: {
          appointment: app   // ⬅️ AQUI VA EL OBJETO COMPLETO
        }
      };
    });
  }

  getColorByStatus(statusId: number) {
    switch (statusId) {
      case 1: // Pendiente
        return {
          primary: '#1E88E5',   // azul
          secondary: '#BBDEFB'
        };
      case 2: // Confirmado
        return {
          primary: '#2E7D32',   // verde
          secondary: '#C8E6C9'
        };
      case 3: // Cancelado
        return {
          primary: '#C62828',   // rojo
          secondary: '#FFCDD2'
        };
      default:
        return {
          primary: '#757575',   // gris
          secondary: '#E0E0E0'
        };
    }
  }

  buildTitle(app: any): string {
    const doctor = app.doctor
      ? `${app.doctor.firstName} ${app.doctor.lastName}`
      : 'Sin doctor';

    const motive = app.motive && app.motive.trim() !== ''
      ? app.motive
      : 'Consulta general';

    return `${doctor} - ${motive}`;
  }

  previousWeek() {
    this.viewDate = subWeeks(this.viewDate, 1);
  }

  nextWeek() {
    this.viewDate = addWeeks(this.viewDate, 1);
  }

  onEventClicked(event: CalendarEvent): void {
    console.log('Evento clickeado:', event);
    const citaCompleta = event.meta?.appointment;
    const dialogRef = this.dialog.open(PreviewConfirmationComponent, {
      panelClass: 'custom-container',
      maxWidth: '90vw',
      width: '450px',
      maxHeight: '85vh',
      data: { data: citaCompleta },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

    if (citaCompleta) {
      console.log('Cita completa:', citaCompleta);
    }
  }

}
