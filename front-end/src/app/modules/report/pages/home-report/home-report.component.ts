import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { CalendarService } from 'app/modules/calendar/services/calendar.service';
import { OptionsService } from 'app/modules/options/services/options.service';
import { PatientService } from 'app/modules/patient/services/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-report',
  templateUrl: './home-report.component.html',
  styleUrls: ['./home-report.component.scss']
})
export class HomeReportComponent implements OnInit {
  appointments: any[] = [];
  patients: any[] = [];
  options: any[] = [];
  appointmentForm: FormGroup;
  showCreateForm = false;
  isSaving = false;
  limit = 10;
  page = 0;
  total = 0;

  constructor(
    private calendarService: CalendarService,
    private patientService: PatientService,
    private optionsService: OptionsService,
    private fb: FormBuilder
  ) {
    this.appointmentForm = this.fb.group({
      patientId: [null, Validators.required],
      dateQuery: [null, Validators.required],
      optionId: [0],
      motive: [''],
      diagnostic: [''],
      observations: [''],
      totalCost: [null],
      wasPaid: [false]
    });
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.calendarService.getLoggedDoctorAppointmentsPaged(this.limit, this.page).subscribe({
      next: (response: any) => {
        const data = response?.data;
        this.appointments = data?.clinicalHistorys ?? [];
        this.total = data?.total ?? 0;
      },
      error: (error) => {
        console.error('Error al obtener citas:', error);
        this.appointments = [];
        this.total = 0;
      }
    });
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
    if (this.showCreateForm && this.patients.length === 0) {
      this.loadFormData();
    }
  }

  loadFormData(): void {
    this.patientService.getlistPatients('Limit=100&Page=0').subscribe({
      next: (response: any) => this.patients = response?.data ?? response ?? [],
      error: () => this.patients = []
    });

    this.optionsService.getListOptions().subscribe({
      next: (response: any) => this.options = response?.data ?? response ?? [],
      error: () => this.options = []
    });
  }

  createAppointment(): void {
    if (this.appointmentForm.invalid || this.isSaving) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    const value = this.appointmentForm.value;
    if (Number(value.optionId) === 0 && !value.motive?.trim()) {
      Swal.fire('Atención', 'Debe escribir un motivo o seleccionar una opción.', 'warning');
      return;
    }

    this.isSaving = true;
    this.calendarService.createDoctorAppointment({
      ...value,
      patientId: Number(value.patientId),
      optionId: Number(value.optionId)
    }).subscribe({
      next: () => {
        this.isSaving = false;
        this.showCreateForm = false;
        this.appointmentForm.reset({ optionId: 0, wasPaid: false });
        this.page = 0;
        this.loadAppointments();
        Swal.fire('Cita creada', 'La cita fue registrada y aceptada correctamente.', 'success');
      },
      error: (error) => {
        this.isSaving = false;
        Swal.fire('Error', error?.error?.message ?? 'No se pudo crear la cita.', 'error');
      }
    });
  }

  pageEvent(event: PageEvent): void {
    this.limit = event.pageSize;
    this.page = event.pageIndex;
    this.loadAppointments();
  }

  getStatusLabel(statusId: number): string {
    switch (statusId) {
      case 1: return 'Pendiente';
      case 2: return 'Aceptada';
      case 3: return 'Cancelada';
      default: return 'Desconocido';
    }
  }

  getStatusColor(statusId: number): string {
    switch (statusId) {
      case 1: return 'blue';
      case 2: return 'green';
      case 3: return 'orange';
      default: return 'gray';
    }
  }
}
