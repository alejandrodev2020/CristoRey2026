import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ShoppingService } from '../../services/shopping.service';
import { environment } from 'environments/enviroments';

@Component({
  selector: 'app-overview-shopping',
  templateUrl: './overview-shopping.component.html',
  styleUrls: ['./overview-shopping.component.scss']
})
export class OverviewShoppingComponent {
  shoppingId : number;
  shoppingOrder : any;
  amountTotal : number = 0;
  logoClient = environment.logo;
  constructor(private dialogRef: MatDialogRef<any>,
              private service : ShoppingService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) data,
              private fb: FormBuilder){
      this.shoppingId= data.id;
      if(this.shoppingId > 0){
        this.setData(this.shoppingId);
      }  
 }

  setData(id : number){
      this.service.getShoppingById(id).subscribe((resp)=>{
        this.shoppingOrder = resp; 
        this.amountTotal = resp.amountTotal;
    });
  }

  close(){
    this.dialogRef.close(true);
  }
  
  downloadPDFTermic(){
    this.shoppingOrder.clientStore = environment.nameStore;
    this.shoppingOrder.codeClient = environment.codeClient;
    this.service.generateReportingPdfShopingById3(this.shoppingOrder.id).subscribe(
        (response: Blob) => {
            const fileURL = URL.createObjectURL(response);
            window.open(fileURL, '_blank');
            setTimeout(() => {
                URL.revokeObjectURL(fileURL);
            }, 100);
        },
        err => {
            console.error('Error al descargar el PDF:', err);
        }
    );

  }

  SendMessageWhatsApp()
  {
    Swal.fire({
      title: 'El cliente "'+  this.shoppingOrder.client.firstName + '"  tiene el numero:' + this.shoppingOrder?.client?.phone,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      denyButtonText: `Enviar a otro numero`,
    }).then((result) => {

      if (result.isConfirmed) {
        let data = { 
          "messaging_product": "whatsapp",
          "to": "591"+ this.shoppingOrder?.client?.phone, 
          "type": "template",
          "1" : "",
          "template":
                  { "name": "hello_world",
                    "language": 
                    { "code": "en_US" } 
                  }
        };
      //     this.service.sendMessageWhatsApp(data).subscribe((response : any)=>{
      // <      let c = response;
      //     });>
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
                // this.service.sendMessageWhatsApp(data).subscribe((response : any)=>{
                //       let c = response;
                // });
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
          }
        })
      }
    })

  }

  // dowloadLeeter(): void {
  //   window.open('#/report/preview-letter-unit/' + this.shoppingId, '_blank');
  // }



}
