import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Provider } from 'app/modules/provider/models/provider';
import { ProviderService } from 'app/modules/provider/services/provider.service';
import { image } from 'app/modules/product/models/image-default.const';

@Component({
  selector: 'app-overview-provider',
  templateUrl: './overview-provider.component.html',
  styleUrls: ['./overview-provider.component.scss']
})
export class OverviewProviderComponent implements OnInit {


  id:number;
  myProvider : Provider;
  imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(image);
  constructor(  private dialogRef: MatDialogRef<any>,
                private sanitizer: DomSanitizer,
                private service: ProviderService,
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
      this.service.getById(this.id).subscribe((ele: Provider)=>{
          this.myProvider = ele;
          if(ele.photo!== null){
            let path = 'data:image/png;base64,'+ele.photo;
            this.setPhoto(path);
           }
      });
  }

}
