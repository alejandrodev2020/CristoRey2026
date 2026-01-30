import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfigurationService } from 'app/modules/configuration/services/configuration.service';
import { environment } from 'environments/enviroments';
import html2canvas from 'html2canvas';

@Component({
  selector: 'preview-sale-whatsapp',
  templateUrl: './preview-sale-whatsapp.component.html',
  styleUrls: ['./preview-sale-whatsapp.component.scss']
})
export class PreviewSaleWhatsappComponent {

  order : any;
  phone : string = "";
  titulo = 'Como Convertir el contenido de un Div a Imagen en Angular 10';
  imgcreada = false;
  nameStore = environment.nameStore;
  imagenCreada;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<any>,
              private serviceConfiguration : ConfigurationService){
        this.order=data.order;
        this.phone = data.phone;
    }  

    ngAfterViewInit(){
      this.setImage();
    }
       
    crearImagen(){
          html2canvas(document.querySelector("#contenido2")).then(canvas => {
            this.imagenCreada = canvas.toDataURL();       
          });
          this.imgcreada = true;
          setTimeout(() => {
            //  this.setImage(this.phone,this.imagenCreada);
          }, 2000);
    }
      
    setImage(){
      let data ={
          number: "591"+this.phone,
          caption: "Agradecemos la preferencia, Gracias por su compra!",
          saleId: this.order.id
      };
      this.serviceConfiguration.sendReceipt(data).subscribe((resp: any) => {
        this.dialogRef.close(resp);
  })
}   
    

}

