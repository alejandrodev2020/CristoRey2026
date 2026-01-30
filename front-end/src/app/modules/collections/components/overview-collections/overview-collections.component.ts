import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SaleService } from 'app/modules/sale/services/sale.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'environments/enviroments';

@Component({
  selector: 'app-overview-collections',
  templateUrl: './overview-collections.component.html',
  styleUrls: ['./overview-collections.component.scss']
})
export class OverviewCollectionsComponent {
  saleId : number;
  saleOrder : any;
  amountTotal : number = 0;
  logoClient= environment.logo;
  constructor(private dialogRef: MatDialogRef<any>,
              private service : SaleService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) data,
              private fb: FormBuilder){
      this.saleId= data.id;
      if(this.saleId > 0){
        this.setData(this.saleId);
      }  
 }

  setData(id : number){
      this.service.getById(id).subscribe((resp)=>{
        this.saleOrder = resp; 
        this.amountTotal = resp.amountTotal;
    });
  }

  close(){
    this.dialogRef.close(true);
  }

  downloadPDFTermic(){
    window.open('#/report/preview-termic-unit/' + this.saleId, '_blank');
  }

  SendMessageWhatsApp()
  {
    Swal.fire({
      title: 'El cliente "'+  this.saleOrder.client.firstName + '"  tiene el numero:' + this.saleOrder?.client?.phone,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      denyButtonText: `Enviar a otro numero`,
    }).then((result) => {

      if (result.isConfirmed) {
        let data = { 
          "messaging_product": "whatsapp",
          "to": "591"+ this.saleOrder?.client?.phone, 
          "type": "template",
          "1" : "",
          "template":
                  { "name": "hello_world",
                    "language": 
                    { "code": "en_US" } 
                  }
        };
          this.service.sendMessageWhatsApp(data).subscribe((response : any)=>{
            let c = response;
          });
        Swal.fire('Enviado!', '', 'success');
      } 
      else if (result.isDenied) {
        Swal.fire({
          title: 'Ingrese nuevo numero',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Enviar',
          showLoaderOnConfirm: true,
          preConfirm: (login) => {

                let data = { 
                              "messaging_product": "whatsapp",
                              "to": "591"+ login, 
                              "type": "template",
                              "1" : "",
                              "template":
                                      { "name": "hello_world",
                                        "language": 
                                        { "code": "en_US" } 
                                      }
                            };
                this.service.sendMessageWhatsApp(data).subscribe((response : any)=>{
                      let c = response;
                });
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
          }
        })
      }
    })

  }

  dowloadLeeter(): void {
    window.open('#/report/preview-letter-unit/' + this.saleId, '_blank');
  }



}
