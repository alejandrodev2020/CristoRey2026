import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SaleService } from 'app/modules/sale/services/sale.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import { ConfigurationService } from 'app/modules/configuration/services/configuration.service';

import { environment } from 'environments/enviroments';
import { PreviewSaleWhatsappComponent } from 'app/modules/sale/components/preview-sale-whatsapp/preview-sale-whatsapp.component';
@Component({
  selector: 'app-orverview-order',
  templateUrl: './orverview-order.component.html',
  styleUrls: ['./orverview-order.component.scss']
})
export class OrverviewOrderComponent {
    saleId: number;
    saleOrder: any;
    amountTotal: number = 0;

    pdfObj = 'https://docs.google.com/viewerng/viewer?url=https://files.elfsight.com/storage/_assets/pdf-embed/files/research.pdf';
    logoClient = environment.logo;
    titulo = 'Como Convertir el contenido de un Div a Imagen en Angular 10';
    imgcreada = false;
    imagenCreada;
    link: string = 'https://tu-enlace.com';

    constructor(private dialogRef: MatDialogRef<any>,
        private service: SaleService,
        private serviceConfiguration: ConfigurationService,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) data,
        private fb: FormBuilder) {
        this.saleId = data.id;
        if (this.saleId > 0) {
            this.setData(this.saleId);
        }
    }

    setData(id: number) {
        this.service.getById(id).subscribe((resp) => {
            this.saleOrder = resp;
            this.amountTotal = resp.amountTotal;
        });
    }

    close() {
        this.dialogRef.close(true);
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

    dowloadTermic(): void {
        this.service.generateReportingPdfSaleById3(this.saleOrder.id).subscribe(
            (response: Blob) => {
                const fileURL = URL.createObjectURL(response);
                window.open(fileURL, '_blank');
                setTimeout(() => {
                    URL.revokeObjectURL(fileURL);
                }, 100);
            },
            err => {
                console.error('Error al descargar el PDF:', err);
            });
    }



    dowloadLeeter(): void {
        this.service.generateReportingPdfSaleByIdLetter(this.saleOrder.id).subscribe(
            (response: Blob) => {
                const fileURL = URL.createObjectURL(response);
                window.open(fileURL, '_blank');
                setTimeout(() => {
                    URL.revokeObjectURL(fileURL);
                }, 100);
            },
            err => {
                console.error('Error al descargar el PDF:', err);
            });
    }


    SendMessageWhatsApp() {
        let validNumber = ((this.saleOrder.client.phone).length == 8);

        if (validNumber) {
            Swal.fire({
                title: 'El cliente "' + this.saleOrder.client.firstName + '"  tiene el numero:' + this.saleOrder?.client?.phone,
                showDenyButton: true,
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Enviar',
                denyButtonText: `Enviar a otro numero`,
            }).then((result) => {
                if (result.isConfirmed) {
                    const dialogRef = this.dialog.open(PreviewSaleWhatsappComponent, {
                        maxWidth: '90vw',
                        autoFocus: false,
                        maxHeight: '90vh',
                        width:'50px',
                        data: {
                            order: this.saleOrder,
                            phone: this.saleOrder?.client?.phone
                        },
                    });
                    dialogRef.afterClosed().subscribe(result => {
                        if (result) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Se Envió el comprobante Exitosamente',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            this.dialogRef.close();
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Ocurrio un error al enviar'
                            })
                        }
                    });
                }
                else if (result.isDenied) {
                    Swal.fire({
                        title: 'Ingrese nuevo numero',
                        input: 'text',

                        inputAttributes: {
                            autocapitalize: 'off'
                        },
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar',
                        confirmButtonText: 'Enviar',
                        showLoaderOnConfirm: true,
                        preConfirm: (login) => {
                            const dialogRef = this.dialog.open(PreviewSaleWhatsappComponent, {
                                autoFocus: false,
                                maxHeight: '90vh',
                                maxWidth: '90vh',
                                width:'450px',
                                data: {
                                    order: this.saleOrder,
                                    phone: login
                                },
                            });

                            dialogRef.afterClosed().subscribe(result => {
                                if (result.statusCode === "COD000") {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Se Envió el comprobante Exitosamente',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    this.dialogRef.close();
                                }
                                else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Ocurrio un error al enviar'
                                    })
                                }
                            });
                        },
                        allowOutsideClick: () => !Swal.isLoading()
                    }).then((result) => {
                        if (result.isConfirmed) {
                        }
                    })
                }
            });
        }
        else {
            Swal.fire({
                title: 'Ingrese el numero destino',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Enviar',
                showLoaderOnConfirm: true,
                preConfirm: (numer) => {
                    Swal.close();
                    const dialogRef = this.dialog.open(PreviewSaleWhatsappComponent, {
                        autoFocus: false,
                        maxHeight: '90vh',
                        maxWidth: '90vw',
                        width:'450px',
                        data: {
                            order: this.saleOrder,
                            phone: numer
                        },
                    });

                    dialogRef.afterClosed().subscribe(result => {
                        if (result) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Se Envió el comprobante Exitosamente',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            this.dialogRef.close();
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Ocurrio un error al enviar'
                            })
                        }
                    });

                    return false;
                },

                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
            });
        }

    }
    setImage(phone, image) {
        this.serviceConfiguration.sendSaleNoteImageClient(phone, this.imagenCreada).subscribe((resp) => {
        })
    }

}
