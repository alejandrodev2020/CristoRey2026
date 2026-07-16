import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Client } from 'app/modules/client/models/client';
import { ClientService } from 'app/modules/client/services/client.service';
import { image } from 'app/modules/product/models/image-default.const';
import { PatientService } from 'app/modules/patient/services/patient.service';

@Component({
  selector: 'app-overview-client',
  templateUrl: './overview-client.component.html',
  styleUrls: ['./overview-client.component.scss']
})
export class OverviewClientComponent implements OnInit {


  id:number;
  isPatient: boolean;
  myProvider : Client;
  imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(image);
  constructor(  private dialogRef: MatDialogRef<any>,
                private sanitizer: DomSanitizer,
                private service: ClientService,
                private patientService: PatientService,
                @Inject(MAT_DIALOG_DATA) data) 
  {
    this.id = data.id;
    this.isPatient = data.source === 'patient';
  }
  ngOnInit(): void {
    if (this.id > 0) {
      this.readData();
    }
  }

  close(){
    this.dialogRef.close(true);
  }

  async setPhoto(data : any){
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }


  readData(){
      const request = this.isPatient
        ? this.patientService.getById(this.id)
        : this.service.getById(this.id);

      request.subscribe((ele: Client)=>{
          this.myProvider = ele;
          if(ele.photo!== null){
            let path = 'data:image/png;base64,'+ele.photo;
            this.setPhoto(path);
           }
      });
  }

}
