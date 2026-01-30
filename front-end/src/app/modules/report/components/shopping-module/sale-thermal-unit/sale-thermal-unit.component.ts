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

  saleOrder : any;
  amountTotal : number = 0;
  @ViewChild('content') content:ElementRef;
  constructor(private route: ActivatedRoute,
              private service : SaleService)
  {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    if(id > 0){
       this.readData(id);
    }
  }

  readData(id : number){
    this.service.getById(id).subscribe((resp)=>{
      this.saleOrder = resp; 
      this.amountTotal = resp.amountTotal;
      // setTimeout(this.generarPDF,1000);
// 
      this.downloadPDF();
  });
  }

  downloadPDF(): void {
    const doc = new jsPDF('p','mm', [600, 228]);
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.setFontStyle('normal');
    doc.text('Este sera ,o reporte PDF!', 2, 10);
    doc.output('dataurlnewwindow');
    window.close();
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
      var img2 = new Image()
      var img3 = new Image()
      img2.src='assets/images/logo/herbas-logo-2.png';
      img3.src='https://upload.wikimedia.org/wikipedia/commons/d/d7/Commons_QR_code.png';
      doc.addImage(img2,'PNG', 1, 1, 45, 20, undefined, 'FAST');
      doc.addImage(img, 'PNG', bufferX, bufferY +20, pdfWidth, pdfHeight, undefined, 'FAST');
      doc.addImage(img3,'PNG', 19, 130, 40, 40, undefined, 'FAST');

      return doc;
    }).then((doc) => {
      doc.output('dataurlnewwindow');
      // window.close();
    });
  }


}
