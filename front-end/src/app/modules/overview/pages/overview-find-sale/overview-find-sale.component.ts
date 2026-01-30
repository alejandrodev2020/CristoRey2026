import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SaleService } from 'app/modules/sale/services/sale.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import { ConfigurationService } from 'app/modules/configuration/services/configuration.service';
import { environment } from 'environments/enviroments';
import { PreviewSaleWhatsappComponent } from 'app/modules/sale/components/preview-sale-whatsapp/preview-sale-whatsapp.component';


@Component({
  selector: 'app-overview-find-sale',
  templateUrl: './overview-find-sale.component.html',
  styleUrls: ['./overview-find-sale.component.scss']
})
export class OverviewFindSaleComponent  {
    saleId: number;
    saleOrder: any;
    amountTotal: number = 0;
    preload : boolean = true;

    pdfObj = 'https://docs.google.com/viewerng/viewer?url=https://files.elfsight.com/storage/_assets/pdf-embed/files/research.pdf';
    logoClient = environment.logo;
    titulo = 'Como Convertir el contenido de un Div a Imagen en Angular 10';
    imgcreada = false;
    imagenCreada;
    link: string = 'https://tu-enlace.com';
    id : number = 0;

    text: string = "¡TakySoft, El mejor software para gestion de tu negocio!";
    displayText: string = "";
    index: number = 0;

    constructor(
        private service: SaleService,
        private activatedRoute: ActivatedRoute,
        private serviceConfiguration: ConfigurationService,
        private fb: FormBuilder) {
            this.saleId = parseInt(this.activatedRoute.snapshot.params['id']);
        if (this.saleId > 0) {
            this.setData(this.saleId);
        }
        this.type();
    }

    setData(id: number) {
        this.service.getById(id).subscribe((resp) => {
            this.saleOrder = resp;
            // this.saleOrder.codeLink = `data:image/png;base64,${resp.codeLink}`;
            this.amountTotal = resp.amountTotal;
        });
    }

    close() {

    }

    downloadPDFTermic() {
        this.saleOrder.clientStore = environment.nameStore;
        this.saleOrder.codeClient = environment.codeClient;
        this.service.generateReportingPdfSaleById(this.saleOrder).subscribe((response: any) => {
            let file = new Blob([response], { type: 'application/pdf' });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        }, err => {

        })
    }

    type() {
        if (this.index < this.text.length) {
          this.displayText += this.text.charAt(this.index);
          this.index++;
          setTimeout(() => this.type(), 50); // Ajusta el tiempo para la velocidad de escritura
        }
        else{
           this.preload=false;
        }
      }

    dowloadLeeter(): void {
        this.saleOrder.clientStore = environment.nameStore;
        this.saleOrder.codeClient = environment.codeClient;

        this.service.generateReportingPdfSaleById2().subscribe(
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


    setImage(phone, image) {
        this.serviceConfiguration.sendSaleNoteImageClient(phone, this.imagenCreada).subscribe((resp) => {
        })
    }

}
