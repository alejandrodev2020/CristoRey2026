import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SaleService } from 'app/modules/sale/services/sale.service';
import Swal from 'sweetalert2';
import { ConfigurationService } from 'app/modules/configuration/services/configuration.service';
import { environment } from 'environments/enviroments';
import { PatientService } from 'app/modules/patient/services/patient.service';

@Component({
  selector: 'app-overview-sale',
  templateUrl: './overview-sale.component.html',
  styleUrls: ['./overview-sale.component.scss']
})
export class OverviewSaleComponent implements OnInit {

  saleId: number;
  saleOrder: any;
  amountTotal: number = 0;

  cita: any = null;

  logoClient = environment.logo;

  formCita: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<any>,
    private service: PatientService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: any,
    private fb: FormBuilder
  ) {
    this.cita = data;
    this.saleId = data?.id;

    // Inicializamos el form
    this.formCita = this.fb.group({
      motive: [''],
      diagnostic: [''],
      observations: [''],
      totalCost: [0],
      wasPaid: [false]
    });
  }

  ngOnInit(): void {
    if (this.cita) {
      this.formCita.patchValue({
        motive: this.cita.motive,
        diagnostic: this.cita.diagnostic,
        observations: this.cita.observations,
        totalCost: this.cita.totalCost,
        wasPaid: this.cita.wasPaid
      });
    }

    if (this.saleId > 0) {
      this.setData(this.saleId);
    }
  }

  setData(id: number) {
    // Si luego necesitas cargar más info
    // this.service.getById(id).subscribe(resp => {
    //   this.saleOrder = resp;
    //   this.amountTotal = resp.amountTotal;
    // });
  }

  close() {
    this.dialogRef.close(false);
  }

  // ==========================
  // 📝 ACTUALIZAR CITA
  // ==========================
    updateCita(): void {
        if (this.formCita.invalid) {
            return;
        }

        const payload = {
            motive: this.formCita.value.motive,
            diagnostic: this.formCita.value.diagnostic,
            observations: this.formCita.value.observations,
            totalCost: this.formCita.value.totalCost,
            wasPaid: this.formCita.value.wasPaid
        };

        this.service.updateCita(this.cita.id, payload).subscribe(() => {
            Swal.fire({
                icon: 'success',
                title: 'Cambios guardados',
                text: 'La cita fue actualizada correctamente',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                this.dialogRef.close(true);
            });
        });
    }

  downloadPDFTermic() {
    this.saleOrder.clientStore = environment.nameStore;
    this.saleOrder.codeClient = environment.codeClient;


  }

  dowloadTermic(): void {

  }

  dowloadLeeter(): void {
 
  }


}
