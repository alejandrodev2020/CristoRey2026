import { Component, Input } from '@angular/core';

@Component({
  selector: 'qr-code-image',
  templateUrl: './qr-code-image.component.html',
  styleUrls: ['./qr-code-image.component.scss']
})
export class QrCodeImageComponent {
  
   data : any;
   imageQr : string = "https://media.tenor.com/XDAe8PDHSIMAAAAM/downsign-qr-code.gif";
   id : string = "";


  @Input('data')
  set item1(val: any) {
    this.data = val;
    
    if(this.data !== undefined && this.data !== null){
          this.setInfoQr();
    }
  }


  constructor(){

  }

  setInfoQr(){
     this.imageQr = "data:image/png;base64,"+ this.data?.qr;
     this.id =  this.data?.id;
  }
}
