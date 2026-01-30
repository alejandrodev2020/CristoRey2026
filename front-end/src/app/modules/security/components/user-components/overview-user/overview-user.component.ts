import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { imageUser } from 'app/shared/models/image-user-default.const';
import { SecurityService } from 'app/modules/security/services/security.service';
@Component({
  selector: 'app-overview-user',
  templateUrl: './overview-user.component.html',
  styleUrls: ['./overview-user.component.scss']
})
export class OverviewUserComponent implements OnInit {


  id:number;
  myProvider : any;
  imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(imageUser);
  constructor(  private dialogRef: MatDialogRef<any>,
                private sanitizer: DomSanitizer,
                private service: SecurityService,
                @Inject(MAT_DIALOG_DATA) data) 
  {
    this.id = data.id;
    if(this.id>0)
    {
      this.readData();
    }
  }
  ngOnInit(): void {
    // this.readData();
  }

  close(){
    this.dialogRef.close(true);
  }

  async setPhoto(data : any){
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }


  readData(){
      this.service.getById(this.id).subscribe((ele: any)=>{
          this.myProvider = ele;
          if(ele.avatar!== null){
            let path = 'data:image/png;base64,'+ele.avatar;
            this.setPhoto(path);
           }
      });
  }

}
