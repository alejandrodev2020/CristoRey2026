import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';


const ELEMENT_DATA: any[] = [];
@Component({
  selector: 'app-overview-movement',
  templateUrl: './overview-movement.component.html',
  styleUrls: ['./overview-movement.component.scss']
})
export class OverviewMovementComponent  implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'amount', 'unitmeasurenment'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  id : number = 0;
  dataRequest : any = null;

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private serviceWarehouse: WarehouseService,
              private dialogRef: MatDialogRef<any>){
      this.id = data.id;
  }

  gestionaryRequest(mode : string){
    let messaje = (mode == 'accept') ? 'Ingrese alguna nota de aceptación' : 'Motivo de rechazo?';
    Swal.fire({
      title: messaje,
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      showLoaderOnConfirm: true,
      preConfirm: async (note) => {
        try {
          let data = (mode == 'accept') ?  { noteAccept : note } : { noteCancelled : note } ;
          if(mode == 'accept'){

            this.serviceWarehouse.acceptRequestMovement(this.id, data).subscribe((resp)=>{
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Solicitud aceptada exitosamente!",
                showConfirmButton: false,
                timer: 1500
              });
              this.dialogRef.close(true);
            });
          }
          else{
            this.serviceWarehouse.rejectRequestMovement(this.id, data).subscribe((resp)=>{
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Solicitud rechazada exitosamente!",
                showConfirmButton: false,
                timer: 1500
              });
              this.dialogRef.close(true);
          });
          }
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }

  ngOnInit(): void {
    this.serviceWarehouse.getMovementById(this.id).subscribe((response:any) => {
        this.dataRequest = response;
       this.dataSource = response.details;
    });
  }

  close() {
    this.dialogRef.close(true);
  }

}
