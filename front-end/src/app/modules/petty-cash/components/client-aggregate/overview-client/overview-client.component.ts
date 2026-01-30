import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'app/modules/client/models/client';
import { ClientService } from 'app/modules/client/services/client.service';

@Component({
  selector: 'app-overview-client',
  templateUrl: './overview-client.component.html',
  styleUrls: ['./overview-client.component.scss']
})
export class OverviewClientComponent implements OnInit {


  id:number;
  myClient : Client;

  constructor(  private dialogRef: MatDialogRef<any>,
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

  readData(){
      this.service.getById(this.id).subscribe((ele: Client)=>{
          this.myClient = ele;
      });
  }

}
