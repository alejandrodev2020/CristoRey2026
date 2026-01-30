import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; // Todavía no lo usamos
import { ActivatedRoute } from '@angular/router';
import { SaleService } from 'app/modules/sale/services/sale.service';
import { imageUser } from 'app/shared/models/image-user-default.const';
import { image } from 'app/modules/product/models/image-default.const';


@Component({
  selector: 'app-sale-thermal-unit',
  templateUrl: './sale-thermal-unit.component.html',
  styleUrls: ['./sale-thermal-unit.component.scss']
})
export class SaleThermalUnitComponent {


  public qrdata: string = null;
  public elementType: "img" | "url" | "canvas" | "svg" = null;
  public level: "L" | "M" | "Q" | "H";
  public scale: number;
  public width: number;



  saleOrder : any;
  amountTotal : number = 0;
  @ViewChild('content') content:ElementRef;
  public myAngularxQrCode: string = null;
  constructor(private route: ActivatedRoute,
              private service : SaleService)
  {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    if(id > 0){
       this.readData(id);
    }
    this.myAngularxQrCode = 'Your QR code data string';

    this.elementType = "img";
    this.level = "M";
    this.qrdata = "Initial QR code data string";
    this.scale = 1;
    this.width = 256;
  }

  readData(id : number){
    this.service.getById(id).subscribe((resp)=>{
      this.saleOrder = resp; 
      this.amountTotal = resp.amountTotal;
      setTimeout(this.generarPDF,100);
      // this.generarPDF();
      // this.downloadPDF();
  });
  }

  downloadPDF(): void {
    const doc = new jsPDF('p','mm', [600, 228]);
    var logo = new Image();
    logo.src='assets/images/logo/herbas-logo-2.png';
    doc.addImage(logo,'PNG', 1, 1, 40, 17, undefined, 'FAST');

    let labelfirst = 'N°:'+ this.saleOrder.order;
    doc.text(labelfirst, 23, 10); 

    /**================================================================================== */
    // doc.addFileToVFS("Poppins-Medium.ttf", fontPoppi);
    doc.addFont("Poppins-Medium.ttf", "Quicksand", "normal");
    doc.setFont("Quicksand");
    doc.setFontType("normal");
    doc.setFontSize(10);
    let labelRowOneColumnOne = 'Cliente:';
    doc.text(labelRowOneColumnOne, 3, 20); 
    
    
    doc.setFontSize(10);
    // doc.addFileToVFS("WorkSans-normal.ttf", font);
    doc.addFont("WorkSans-normal.ttf", "WorkSans", "normal");
    doc.setFont("WorkSans");
    let labelRowOneColumnTwo = this.saleOrder.client.firstName  + ' ' + this.saleOrder.client.lastName;
    doc.text(labelRowOneColumnTwo, 23, 20);
    /**================================================================================== */

    /**================================================================================== */
    // doc.addFileToVFS("Poppins-Medium.ttf", fontPoppi);
    doc.addFont("Poppins-Medium.ttf", "Quicksand", "normal");
    doc.setFont("Quicksand");
    doc.setFontType("normal");
    doc.setFontSize(10);
    let labelRowTwoColumnOne = 'Vendedor:';
    doc.text(labelRowTwoColumnOne, 3, 25); 
    
    
    doc.setFontSize(10);
    // doc.addFileToVFS("WorkSans-normal.ttf", font);
    doc.addFont("WorkSans-normal.ttf", "WorkSans", "normal");
    doc.setFont("WorkSans");
    let labelRowTwoColumnTwo = 'Carlos Eduardo Fernandez P.';
    doc.text(labelRowTwoColumnTwo, 23, 25);
    /**================================================================================== */

    /**================================================================================== */
    // doc.addFileToVFS("Poppins-Medium.ttf", fontPoppi);
    doc.addFont("Poppins-Medium.ttf", "Quicksand", "normal");
    doc.setFont("Quicksand");
    doc.setFontType("normal");
    doc.setFontSize(10);
    let labelRowTreeColumnOne = 'Tipo Venta:';
    doc.text(labelRowTreeColumnOne, 3, 30); 
    
    
    doc.setFontSize(10);
    // doc.addFileToVFS("WorkSans-normal.ttf", font);
    doc.addFont("WorkSans-normal.ttf", "WorkSans", "normal");
    doc.setFont("WorkSans");
    let labelRowTreeColumnTwo = this.saleOrder.saleType.name;
    doc.text(labelRowTreeColumnTwo, 23, 30);
    /**================================================================================== */
    /**================================================================================== */
    // doc.addFileToVFS("Poppins-Medium.ttf", fontPoppi);
    doc.addFont("Poppins-Medium.ttf", "Quicksand", "normal");
    doc.setFont("Quicksand");
    doc.setFontType("normal");
    doc.setFontSize(10);
    let labelRowFourColumnOne = 'Fecha:';
    doc.text(labelRowFourColumnOne, 3, 35); 
    
    
    doc.setFontSize(10);
    // doc.addFileToVFS("WorkSans-normal.ttf", font);
    doc.addFont("WorkSans-normal.ttf", "WorkSans", "normal");
    doc.setFont("WorkSans");
    let labelRowFourColumnTwo = this.saleOrder.saleDate;
    doc.text(labelRowFourColumnTwo, 23, 35);
    /**================================================================================== */
    /**================================================================================== */
    // doc.addFileToVFS("Poppins-Medium.ttf", fontPoppi);
    doc.addFont("Poppins-Medium.ttf", "Quicksand", "normal");
    doc.setFont("Quicksand");
    doc.setFontType("normal");
    doc.setFontSize(10);
    let labelRowFiveColumnOne = 'Fecha:';
    doc.text(labelRowFiveColumnOne, 3, 40); 
    
    
    doc.setFontSize(10);
    // doc.addFileToVFS("WorkSans-normal.ttf", font);
    doc.addFont("WorkSans-normal.ttf", "WorkSans", "normal");
    doc.setFont("WorkSans");
    let labelRowFiveColumnTwo = this.saleOrder.saleDate;
    doc.text(labelRowFiveColumnTwo, 23, 40);
    /**================================================================================== */
    /**================================================================================== */
    // doc.addFileToVFS("Poppins-Medium.ttf", fontPoppi);
    doc.addFont("Poppins-Medium.ttf", "Quicksand", "normal");
    doc.setFont("Quicksand");
    doc.setFontType("normal");
    doc.setFontSize(10);
    let labelRowSixColumnOne = 'Fecha:';
    doc.text(labelRowSixColumnOne, 3, 45); 
    
    
    doc.setFontSize(10);
    // doc.addFileToVFS("WorkSans-normal.ttf", font);
    doc.addFont("WorkSans-normal.ttf", "WorkSans", "normal");
    doc.setFont("WorkSans");
    let labelRowSixColumnTwo = this.saleOrder.saleDate;
    doc.text(labelRowSixColumnTwo, 23, 45);
    /**================================================================================== */


    doc.output('dataurlnewwindow');
    // window.close();
  }


  generarPDF() {
    const div = document.getElementById('content');
    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(div, options).then((canvas) => {

      var img = canvas.toDataURL("image/PNG");
      const doc = new jsPDF('p','mm', [600, 228]);

      const bufferX = 3;
      const bufferY = 3;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      var imgLogo = new Image()
      imgLogo.src='assets/images/logo/herbas-logo-2.png';
      doc.addImage(imgLogo,'PNG', 1, 1, 45, 20, undefined, 'FAST');
      doc.addImage(img, 'PNG', bufferX, bufferY +20, pdfWidth, pdfHeight, undefined, 'FAST');

      return doc;
    }).then((doc) => {
      doc.output('dataurlnewwindow');
      // window.close();
    });
  }


}
