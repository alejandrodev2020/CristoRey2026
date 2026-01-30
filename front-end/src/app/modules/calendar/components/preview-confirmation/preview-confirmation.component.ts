import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarService } from '../../services/calendar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preview-confirmation',
  templateUrl: './preview-confirmation.component.html',
  styleUrls: ['./preview-confirmation.component.scss']
})
export class PreviewConfirmationComponent implements AfterViewInit {
  form: FormGroup;
  appointment: any; 
  patient: any;     
  doctor: any;      

  @ViewChild('aForm2') aForm2: ElementRef;

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private service : CalendarService,
    private fb: FormBuilder
  ) {
    this.appointment = data?.data || data;
    this.patient = this.appointment?.patient;
    this.doctor = this.appointment?.doctor;

    // Form vacío por si deseas capturar algo después
    this.form = this.fb.group({
      note: [null],
    });
  }

  ngAfterViewInit() {}

  close(): void {
    this.dialogRef.close(null);
  }

  onAccept(): void {
    this.service.aceptCita(this.appointment.id).subscribe((resp : any)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Su cita se acepto, con exito!',
          showConfirmButton: false,
          timer: 1500
        })

          this.dialogRef.close({
            action: 'accept',
            appointment: this.appointment
          });
    })

  }

  onReject(): void {
    this.service.rejectCita(this.appointment.id).subscribe((resp : any)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Su cita se rechazo, con exito!',
          showConfirmButton: false,
          timer: 1500
        })
        this.dialogRef.close({
          action: 'reject',
          appointment: this.appointment
        });
    })
  }

  control(key: string): FormControl {
    return this.form.controls[key] as FormControl;
  }
}
