import { AfterViewInit, Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SaleService } from 'app/modules/sale/services/sale.service';
import  * as QRCode  from 'qrcode';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sale-letter-unit',
  templateUrl: './sale-letter-unit.component.html',
  styleUrls: ['./sale-letter-unit.component.scss']
})
export class SaleLetterUnitComponent implements AfterViewInit{

  saleOrder : any;
  amountTotal : number = 0
  id: number ;
  countDetails : number;
  constructor(private service : SaleService,
              private route: ActivatedRoute) {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.id = id;
  }
  
  ngAfterViewInit(): void {
   this.readData(this.id);
     setTimeout(this.openPDF,1000);
  }
  
  readData(id : number){
   this.service.getById(id).subscribe((resp)=>{
   this.saleOrder = resp;
   let cout : [] = this.saleOrder.details;
   this.countDetails = cout.length;
   this.amountTotal = resp.amountTotal;
   });
  }
  
  
  async openPDF() {
   let DATA: any = document.getElementById('htmlData');
  
   let CodeQrBase64 : string = await new Promise((resolve, reject) => {
   QRCode.toDataURL('aqui ira la URL', function (err, code) {
   if (err) {
   reject(reject);
   return;
   }
   resolve(code);
   });
   });
   await html2canvas(DATA).then((canvas) => {
     
   let fileWidth = 110;
   let fileHeight = (canvas.height * fileWidth) / canvas.width;
   const FILEURI = canvas.toDataURL('image/PNG');
   let PDF = new jsPDF('p','mm', [600, 228]);

   let logoImage = new Image();
   logoImage.src = 'assets/images/logo/logo2.png';
   PDF.addImage(logoImage, 'PNG', 1, 1, 45, 10);
  
   let position = 10;
   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);


   let QrImage = new Image();
   QrImage.src = CodeQrBase64;
   PDF.addImage(QrImage, 'PNG', 15, 78, 45, 45);
   PDF.output('dataurlnewwindow');
   });
  }
  }
  