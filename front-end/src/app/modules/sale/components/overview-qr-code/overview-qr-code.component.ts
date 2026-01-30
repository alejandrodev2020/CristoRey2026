import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigurationService } from 'app/modules/configuration/services/configuration.service';
import { DateFormatPipe } from 'app/shared/tools/pipe/date-format.pipe';
import Swal from 'sweetalert2';
import { QrBankinBnb } from '../../models/qrBankinBnb';
import { QrClient } from 'assets/images/client-data/qr-client';
import { QrClientBoucher } from 'assets/images/client-data/qr-client-boucher';

@Component({
  selector: 'app-overview-qr-code',
  templateUrl: './overview-qr-code.component.html',
  styleUrls: ['./overview-qr-code.component.scss']
})
export class OverviewQrCodeComponent {


  data : any ;
  QrBanking : QrBankinBnb;
  QrBanking2 : string;
  QrBankingBoucher: string;
  numberPhone: number = 0;
  validNumberPhone : boolean = false;
  labelPhone :string= "";
  constructor(@Inject(MAT_DIALOG_DATA) data,
              private dialogRef: MatDialogRef<any>,
              private service : ConfigurationService,
              private pipeDate : DateFormatPipe,
              private serviceConfiguration : ConfigurationService){
     this.data = { amountTotal : 0};
    // this.generateQr();
    this.validNumber();
  }
  async generateQr() {
    let currentExpiration =   this.pipeDate.transform(new Date,'YYYY-MM-dd');
    let amount = this.data.amountTotal;
    let qrCurrent = QrClient;
    this.QrBanking2 = qrCurrent;
    this.QrBankingBoucher= QrClientBoucher;
    // await this.service.generateCodeQr(amount,currentExpiration).subscribe((responseQr : QrBankinBnb)=>{
    //    this.QrBanking = responseQr;
    //  });
  }

  sendCodeQrClient(){

    let tmp = {
                  to: this.numberPhone
              };
              this.service.sendCodeQrClient(tmp,this.QrBanking.qr).subscribe((resp)=>{
                ;
              })
  }

  validNumber(){
    this.labelPhone  = "Compartir con 67394939";
    this.numberPhone = 67394939;
    this.validNumberPhone = true;
    this.QrBanking2 = QrClientBoucher;
    // if(this.data.client.phone.length === 8){

    //   this.validNumberPhone = true;
    //   this.numberPhone = this.data.client.phone;
    //   this.labelPhone  = "Compartir con "+ this.data.client.phone;
    // }
    // else{
    //   this.validNumberPhone = false;
    // }

  }

  close(){
    this.dialogRef.close(true);
  }


  SendMessageWhatsApp()
  {

    Swal.fire({
      title: 'El cliente "'+ this.data?.client?.firstName+ '"  tiene el numero:' ,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      denyButtonText: `Enviar a otro numero`,
    }).then((result) => {

      if (result.isConfirmed) {
        let data = {
          "messaging_product": "whatsapp",
          "to": "591",
          "type": "template",
          "1" : "",
          "template":
                  { "name": "hello_world",
                    "language":
                    { "code": "en_US" }
                  }
        };
          // this.service.sendMessageWhatsApp(data).subscribe((response : any)=>{
          //   let c = response;
          // });
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
                              "to": login,
                              "type": "template",
                              "1" : "",
                              "template":
                                      { "name": "hello_world",
                                        "language":
                                        { "code": "en_US" }
                                      }
                            };
                            this.QrBankingBoucher = "as," + this.QrBankingBoucher;
                this.serviceConfiguration.sendSaleNoteImageClient(data.to,QrClientBoucher).subscribe((response : any)=>{
                      let c = response;
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Se Envió el Qr Exitosamente',
                        showConfirmButton: false,
                        timer: 1500
                      });
                      this.close();
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


}
