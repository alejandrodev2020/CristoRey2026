import { Component } from '@angular/core';
import { ConfigurationService } from '../../services/configuration.service';
import { WhatsappQr } from '../../../../shared/interfaces/http/IResponse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-whats-app',
  templateUrl: './whats-app.component.html',
  styleUrls: ['./whats-app.component.scss']
})
export class WhatsAppComponent {

  imageqr : string | null = null;
  form: FormGroup;
  sessionActive : boolean = false;
  imageQrBanner  : string | null = null;
  labelText : string = "Escanear tu WhatsApp para enviar los comprobantes a tus clientes";

  constructor(private service : ConfigurationService,
              private fb: FormBuilder
  ){
    this.form = this.fb.group({
      text: [null],
      number: [null],
    });
    this.getStatus();

  }

  getStatus(){
    this.service.getStatusWhatsApp().subscribe((resp: any)=>{
      let data = resp.response;
      const jsonObject = JSON.parse(data);
      if(jsonObject.statusCode === "COD000"){
         this.sessionActive = true;
         this.labelText = "Tu sessión esta activada correctamente!"
         this.imageqr = 'https://www.shutterstock.com/image-vector/mobile-payment-success-received-tranfer-260nw-2471583209.jpg'

      }
      // this.sessionActive = !(resp?.response === 'Cliente de WhatsApp no está listo' );

      // if(resp.success){
      //       this.imageqr =`data:image/png;base64,${resp.image}`;
      //     }
    });
  }

  generateQr(){
    this.service.generateCodeQrWhatsApp().subscribe((resp: WhatsappQr)=>{
      if(resp.success){
            let data = resp.image;
            const jsonObject = JSON.parse(data);
            this.imageqr =`data:image/png;base64,${jsonObject.response}`;
            this.sessionActive = true;
            this.labelText = "Tu sessión esta activada correctamente!"
          }
    });
  }

  closeSession(){
    this.service.closeSessionWhatsApp().subscribe((resp: any)=>{
      this.sessionActive = !(resp?.response === 'Cliente de WhatsApp no está listo' );
      if(resp.success){
            this.imageqr =`data:image/png;base64,${resp.image}`;
            this.labelText =  "Escanear tu WhatsApp para enviar los comprobantes a tus clientes";
        }
    });
  }

  save(): void {
    if (!this.form.valid) {
      return alert('datos invalidos');
    }

    let data: any = this.form.value;

    try {
      this.service.SendMessageWhatsApp(data).subscribe((resp:any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Su Caja se aperturo correctamente',
          showConfirmButton: false,
          timer: 1500
        })

      }, (error)=>{
         let exception : string = error.error;
         let exceptionMessage = exception.split("\n")[0].split(":")[1];
         Swal.fire({
          icon: 'error',
          title: 'Ocurrio un Problema...',
          text: exceptionMessage
        })
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un Problema...',
        text: err
      })
    }


  }


}
