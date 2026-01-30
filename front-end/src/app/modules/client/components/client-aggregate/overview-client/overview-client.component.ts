import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Client } from 'app/modules/client/models/client';
import { ClientService } from 'app/modules/client/services/client.service';
import { image } from 'app/modules/product/models/image-default.const';

@Component({
  selector: 'app-overview-client',
  templateUrl: './overview-client.component.html',
  styleUrls: ['./overview-client.component.scss']
})
export class OverviewClientComponent implements OnInit {


  id:number;
  myProvider : Client;
  imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(image);
  constructor(  private dialogRef: MatDialogRef<any>,
                private sanitizer: DomSanitizer,
                private service: ClientService,
                @Inject(MAT_DIALOG_DATA) data) 
  {
    this.id = data.id;
    if(this.id>0)
    {
      this.readData();
    }
  }
  ngOnInit(): void {
    this.readData();
  }

  close(){
    this.dialogRef.close(true);
  }

  async setPhoto(data : any){
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }


  readData(){
      this.service.getById(this.id).subscribe((ele: Client)=>{
          this.myProvider = ele;
          if(ele.photo!== null){
            let path = 'data:image/png;base64,'+ele.photo;
            this.setPhoto(path);
           }
      });
  }

}
